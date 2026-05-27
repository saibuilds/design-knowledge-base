# Supabase — Backend Setup

> Open source Firebase alternative. Free tier: 500MB DB, 1GB storage, 50MB file uploads.

## Install
```bash
npm install @supabase/supabase-js
```

## Setup
```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Contact Form (replaces MongoDB)
```ts
// In Supabase: create table "contacts" with columns:
// id, name, email, phone, service, message, created_at

// Submit handler
const submitContact = async (data: ContactFormData) => {
  const { error } = await supabase.from('contacts').insert([{
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    message: data.message,
  }])
  if (error) throw error
}
```

## Auth (for admin panel)
```tsx
// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password',
})

// Check session
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()
```

## File Storage (project images)
```ts
// Upload
const { data, error } = await supabase.storage
  .from('projects')
  .upload(`${Date.now()}-${file.name}`, file)

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('projects')
  .getPublicUrl(data.path)
```

## Real-time subscription
```ts
// Listen for new contacts
supabase.channel('contacts').on('postgres_changes',
  { event: 'INSERT', schema: 'public', table: 'contacts' },
  (payload) => { console.log('New contact:', payload.new) }
).subscribe()
```

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # Server-side only
```

## Free Tier Limits
- 500MB database
- 1GB file storage  
- 50,000 monthly active users
- 2GB bandwidth
- 500K edge function invocations
