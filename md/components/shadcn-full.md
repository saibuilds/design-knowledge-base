# shadcn/ui — Full Component Reference

> Scraped: 2026-05-28T13:59:45.521Z
> Total: 19

---

## accordion
> Source: https://ui.shadcn.com/docs/components/accordion

```tsx
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## alert
> Source: https://ui.shadcn.com/docs/components/alert

```tsx
<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

---

## alert-dialog
> Source: https://ui.shadcn.com/docs/components/alert-dialog

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## calendar
> Source: https://ui.shadcn.com/docs/components/calendar

```tsx
  // In the day classNames:
- [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)
+ [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)
- [&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)
- [&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)
 
  // In range_start classNames:
- rounded-l-(--cell-radius) ... after:right-0
+ rounded-s-(--cell-radius) ... after:end-0
 
  // In range_end classNames:
- rounded-r-(--cell-radius) ... after:left-0
+ rounded-e-(--cell-radius) ... after:start-0
 
  // In CalendarDayButton className:
- data-[range-end=true]:rounded-r-(--cell-radius)
+ data-[range-end=true]:rounded-e-(--cell-radius)
- data-[range-start=true]:rounded-l-(--cell-radius)
+ data-[range-start=true]:rounded-s-(--cell-radius)
```

---

## card
> Source: https://ui.shadcn.com/docs/components/card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

---

## carousel
> Source: https://ui.shadcn.com/docs/components/carousel
> Dependencies: @/components/ui/carousel

```tsx
import { type CarouselApi } from "@/components/ui/carousel"
 
export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
 
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

---

## chart
> Source: https://ui.shadcn.com/docs/components/chart

```tsx
<ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

---

## checkbox
> Source: https://ui.shadcn.com/docs/components/checkbox
> Dependencies: react

```tsx
import * as React from "react"
 
export function Example() {
  const [checked, setChecked] = React.useState(false)
 
  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

---

## collapsible
> Source: https://ui.shadcn.com/docs/components/collapsible
> Dependencies: react

```tsx
import * as React from "react"
 
export function Example() {
  const [open, setOpen] = React.useState(false)
 
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

---

## command
> Source: https://ui.shadcn.com/docs/components/command

```tsx
<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

---

## combobox
> Source: https://ui.shadcn.com/docs/components/combobox
> Dependencies: react, @/components/ui/combobox

```tsx
import * as React from "react"
 
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"
 
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
 
export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])
 
  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

---

## context-menu
> Source: https://ui.shadcn.com/docs/components/context-menu

```tsx
ContextMenu


├── ContextMenuTrigger


└── ContextMenuContent


    ├── ContextMenuGroup


    │   ├── ContextMenuLabel


    │   ├── ContextMenuItem


    │   └── ContextMenuItem


    ├── ContextMenuSeparator


    ├── ContextMenuGroup


    │   ├── ContextMenuLabel


    │   ├── ContextMenuCheckboxItem


    │   └── ContextMenuCheckboxItem


    ├── ContextMenuSeparator


    ├── ContextMenuGroup


    │   ├── ContextMenuLabel


    │   └── ContextMenuRadioGroup


    │       ├── ContextMenuRadioItem


    │       └── ContextMenuRadioItem


    └── ContextMenuSub


        ├── ContextMenuSubTrigger


        └── ContextMenuSubContent


            └── ContextMenuGroup


                ├── ContextMenuItem


                └── ContextMenuItem
```

---

## sonner
> Source: https://ui.shadcn.com/docs/components/sonner
> Dependencies: @/components/ui/sonner

```tsx
import { Toaster } from "@/components/ui/sonner"
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

---

## switch
> Source: https://ui.shadcn.com/docs/components/switch
> Dependencies: @/components/ui/field, @/components/ui/switch

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
```

---

## table
> Source: https://ui.shadcn.com/docs/components/table

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## tabs
> Source: https://ui.shadcn.com/docs/components/tabs

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

---

## textarea
> Source: https://ui.shadcn.com/docs/components/textarea
> Dependencies: @/components/ui/field, @/components/ui/textarea

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
```

---

## toggle-group
> Source: https://ui.shadcn.com/docs/components/toggle-group

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

---

## tooltip
> Source: https://ui.shadcn.com/docs/components/tooltip
> Dependencies: @/components/ui/tooltip

```tsx
import { TooltipProvider } from "@/components/ui/tooltip"
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

---

