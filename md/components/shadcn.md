# shadcn/ui — Component Reference

> MIT License. You own all code. Copy-paste or use CLI.
> All components: https://ui.shadcn.com/docs/components

## Install
```bash
npx shadcn@latest init
# Choose: TypeScript, Tailwind, src/ dir, @/ alias
```

## Add Components
```bash
npx shadcn@latest add button card dialog sheet tabs badge
npx shadcn@latest add command popover dropdown-menu
npx shadcn@latest add form input label select textarea
npx shadcn@latest add toast sonner alert-dialog
npx shadcn@latest add accordion collapsible separator
npx shadcn@latest add avatar skeleton progress
npx shadcn@latest add calendar date-picker
npx shadcn@latest add chart  # recharts wrapper
```

## Most Used Patterns

### Button variants
```tsx
import { Button } from "@/components/ui/button"
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Card
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Kitchen renovation in North York</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button>View Project</Button>
  </CardFooter>
</Card>
```

### Dialog (modal)
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Project Details</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>
```

### Sheet (sidebar/drawer)
```tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
<Sheet>
  <SheetTrigger asChild><Button>Menu</Button></SheetTrigger>
  <SheetContent side="right">Sidebar content</SheetContent>
</Sheet>
```

### Form with validation
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({ email: z.string().email(), name: z.string().min(2) })

export function ContactForm() {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Toast notifications
```tsx
import { toast } from "sonner"
toast.success("Message sent!")
toast.error("Something went wrong")
toast.loading("Sending...")
// In layout: <Toaster richColors position="top-right" />
```

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
<Tabs defaultValue="kitchen">
  <TabsList>
    <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
    <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
  </TabsList>
  <TabsContent value="kitchen">Kitchen projects</TabsContent>
  <TabsContent value="bathroom">Bathroom projects</TabsContent>
</Tabs>
```

### Accordion (FAQ)
```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
<Accordion type="single" collapsible>
  {faqs.map((faq, i) => (
    <AccordionItem key={i} value={`item-${i}`}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

## Blocks (full page sections)
```bash
npx shadcn@latest add "https://ui.shadcn.com/r/sidebar-01"
npx shadcn@latest add "https://ui.shadcn.com/r/login-01"
npx shadcn@latest add "https://ui.shadcn.com/r/dashboard-01"
```

## Customizing theme (globals.css)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 38 92% 50%;      /* amber */
  --primary-foreground: 0 0% 0%;
  --border: 240 5.9% 90%;
  --radius: 0.5rem;
}
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 38 92% 50%;
  --border: 240 3.7% 15.9%;
}
```
