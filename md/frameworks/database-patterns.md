# Database & API Patterns — Supabase + Next.js

---

## 1. Supabase Client Setup

### Browser Client

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Server Client (App Router)

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

### Route Handler Client

```typescript
// lib/supabase/route-handler.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export async function createRouteHandlerClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

---

## 2. TypeScript Types from Supabase

```bash
# Generate types from your Supabase project
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

```typescript
// types/supabase.ts (abbreviated example)
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
        }
      }
    }
  }
}

// Convenience types
export type Post = Database['public']['Tables']['posts']['Row']
export type NewPost = Database['public']['Tables']['posts']['Insert']
export type UpdatePost = Database['public']['Tables']['posts']['Update']
```

---

## 3. Server Actions for Mutations

### Create

```typescript
// app/actions/posts.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { NewPost } from '@/types/supabase'

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const payload: NewPost = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    user_id: user.id,
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(payload)
    .select()
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/posts')
  redirect(`/dashboard/posts/${data.id}`)
}
```

### Update

```typescript
// app/actions/posts.ts (continued)
export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .update({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/posts')
  revalidatePath(`/dashboard/posts/${id}`)
}
```

### Delete

```typescript
export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/posts')
}
```

### Using Server Actions in a Form

```typescript
// app/dashboard/posts/new/page.tsx
import { createPost } from '@/app/actions/posts'

export default function NewPostPage() {
  return (
    <form action={createPost} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Publish
      </button>
    </form>
  )
}
```

---

## 4. TanStack Query with Supabase

```bash
npm install @tanstack/react-query
```

### Query Client Provider

```typescript
// components/providers/query-provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### Query Hooks

```typescript
// hooks/use-posts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Post, NewPost } from '@/types/supabase'

const supabase = createClient()

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async (): Promise<Post> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: NewPost): Promise<Post> => {
      const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
```

---

## 5. Optimistic Updates Pattern

```typescript
// hooks/use-posts.ts (continued)
import type { UpdatePost } from '@/types/supabase'

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdatePost }) => {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onMutate: async ({ id, updates }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts', id] })

      // Snapshot previous value
      const previousPost = queryClient.getQueryData<Post>(['posts', id])

      // Optimistically update
      queryClient.setQueryData<Post>(['posts', id], (old) =>
        old ? { ...old, ...updates } : old
      )

      // Also update in list
      queryClient.setQueryData<Post[]>(['posts'], (old) =>
        old?.map((p) => (p.id === id ? { ...p, ...updates } : p))
      )

      return { previousPost }
    },
    onError: (_err, { id }, context) => {
      // Rollback on error
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', id], context.previousPost)
      }
    },
    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] })
    },
  })
}
```

---

## 6. Infinite Scroll / Cursor Pagination

```typescript
// hooks/use-infinite-posts.ts
import { useInfiniteQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types/supabase'

const PAGE_SIZE = 20
const supabase = createClient()

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam }): Promise<{ data: Post[]; nextCursor: string | null }> => {
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(PAGE_SIZE)

      if (pageParam) {
        query = query.lt('created_at', pageParam)
      }

      const { data, error } = await query
      if (error) throw error

      const nextCursor =
        data.length === PAGE_SIZE ? data[data.length - 1].created_at : null

      return { data, nextCursor }
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}
```

```typescript
// components/posts/infinite-post-list.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useInfinitePosts } from '@/hooks/use-infinite-posts'

export function InfinitePostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    )
  }

  const posts = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <h3 className="font-semibold text-gray-900">{post.title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{post.content}</p>
        </div>
      ))}

      <div ref={loadMoreRef} className="py-4 text-center">
        {isFetchingNextPage && (
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        )}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-sm text-gray-500">All posts loaded</p>
        )}
      </div>
    </div>
  )
}
```

---

## 7. File Upload to Supabase Storage

```typescript
// components/upload/file-uploader.tsx
'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface FileUploaderProps {
  bucket: string
  onUpload: (url: string) => void
}

export function FileUploader({ bucket, onUpload }: FileUploaderProps) {
  const supabase = createClient()
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(
    async (file: File) => {
      setIsUploading(true)
      setError(null)
      setProgress(0)

      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Supabase Storage doesn't support progress natively,
      // so simulate progress with XHR for UX
      const { data: { session } } = await supabase.auth.getSession()

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100))
          }
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve()
          } else {
            reject(new Error('Upload failed'))
          }
        }
        xhr.onerror = () => reject(new Error('Upload failed'))

        const formData = new FormData()
        formData.append('', file)

        xhr.open(
          'POST',
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`
        )
        xhr.setRequestHeader('Authorization', `Bearer ${session?.access_token}`)
        xhr.send(formData)
      })

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      onUpload(data.publicUrl)
      setIsUploading(false)
      setProgress(100)
    },
    [bucket, onUpload, supabase]
  )

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) await uploadFile(file)
    },
    [uploadFile]
  )

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await uploadFile(file)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition ${
        isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {isUploading ? (
        <div className="w-full max-w-xs space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600">{progress}% uploaded</p>
        </div>
      ) : (
        <>
          <svg className="mb-3 h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm font-medium text-gray-700">Drag and drop or click to upload</p>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 50MB</p>
        </>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
```

---

## 8. Realtime Subscriptions

### Chat Messages

```typescript
// hooks/use-realtime-messages.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  content: string
  user_id: string
  room_id: string
  created_at: string
}

export function useRealtimeMessages(roomId: string) {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Initial fetch
    supabase
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data)
      })

    // Subscribe to new messages
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  return messages
}
```

### Live Dashboard Subscription

```typescript
// hooks/use-live-stats.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Stats {
  active_users: number
  total_sales: number
  pending_orders: number
}

export function useLiveStats() {
  const supabase = createClient()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('stats')
        .select('*')
        .single()
      setStats(data)
    }

    fetchStats()

    const channel = supabase
      .channel('stats-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stats' },
        (payload) => {
          setStats(payload.new as Stats)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return stats
}
```

---

## 9. Full-Text Search

```sql
-- Add a tsvector column for fast search
alter table posts add column search_vector tsvector
  generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
  ) stored;

create index posts_search_idx on posts using gin(search_vector);
```

```typescript
// hooks/use-search.ts
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/types/supabase'

const supabase = createClient()

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async (): Promise<Post[]> => {
      if (!query.trim()) return []

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .textSearch('search_vector', query, {
          type: 'websearch',
          config: 'english',
        })
        .limit(20)

      if (error) throw error
      return data
    },
    enabled: query.length > 1,
  })
}
```

---

## 10. Row Level Security Policy Examples

```sql
-- Users table: users manage their own records
alter table posts enable row level security;

-- SELECT: users can read their own posts
create policy "Users read own posts"
  on posts for select
  using (auth.uid() = user_id);

-- SELECT: published posts are public
create policy "Published posts are public"
  on posts for select
  using (status = 'published');

-- INSERT: authenticated users only
create policy "Authenticated users can insert"
  on posts for insert
  to authenticated
  with check (auth.uid() = user_id);

-- UPDATE: own posts only
create policy "Users update own posts"
  on posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: own posts only
create policy "Users delete own posts"
  on posts for delete
  using (auth.uid() = user_id);

-- Admins bypass RLS using service_role (in admin client)
-- Or explicitly:
create policy "Admins can do everything"
  on posts for all
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

---

## 11. Edge Functions Pattern

```typescript
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface NotificationPayload {
  userId: string
  message: string
  type: 'info' | 'warning' | 'success'
}

serve(async (req) => {
  const { userId, message, type }: NotificationPayload = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { error } = await supabase.from('notifications').insert({
    user_id: userId,
    message,
    type,
  })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
```

```typescript
// Calling an Edge Function from Next.js
async function callEdgeFunction(payload: NotificationPayload) {
  const supabase = createClient()

  const { data, error } = await supabase.functions.invoke('send-notification', {
    body: payload,
  })

  if (error) throw error
  return data
}
```

---

## 12. Error Handling + Toast Feedback Pattern

```bash
npm install sonner
```

```typescript
// components/providers/toast-provider.tsx
'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'font-sans text-sm',
          error: 'bg-red-50 text-red-900 border-red-200',
          success: 'bg-green-50 text-green-900 border-green-200',
        },
      }}
    />
  )
}
```

```typescript
// lib/handle-error.ts
import { toast } from 'sonner'

export function handleError(error: unknown, fallback = 'Something went wrong') {
  const message = error instanceof Error ? error.message : fallback
  toast.error(message)
  console.error(error)
}
```

```typescript
// Usage in a client component with TanStack Query
import { toast } from 'sonner'
import { useCreatePost } from '@/hooks/use-posts'
import { handleError } from '@/lib/handle-error'

export function CreatePostButton() {
  const { mutate, isPending } = useCreatePost()

  function handleClick() {
    mutate(
      { title: 'New Post', content: '...', user_id: 'user-id' },
      {
        onSuccess: () => toast.success('Post created!'),
        onError: (error) => handleError(error),
      }
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
    >
      {isPending ? 'Creating...' : 'Create Post'}
    </button>
  )
}
```

```typescript
// Error handling in Server Actions
'use server'

export async function createPost(formData: FormData) {
  try {
    const supabase = await createClient()
    // ... mutation logic
  } catch (error) {
    // Return structured error for client to handle
    return {
      error: error instanceof Error ? error.message : 'Failed to create post',
    }
  }
}
```

```typescript
// Using the returned error in a form component
'use client'

import { useActionState } from 'react'
import { createPost } from '@/app/actions/posts'
import { toast } from 'sonner'
import { useEffect } from 'react'

export function PostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null)

  useEffect(() => {
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="space-y-4">
      <input name="title" required className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
```
