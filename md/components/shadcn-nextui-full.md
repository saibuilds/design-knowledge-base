# shadcn/ui — Complete Reference

## Accordion

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

---

## Alert

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, AlertCircle } from "lucide-react"

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  )
}
```

---

## Alert Dialog

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

---

## Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-lg">JD</AvatarFallback>
      </Avatar>

      {/* Fallback only */}
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  )
}
```

---

## Badge

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}
```

---

## Button

```tsx
import { Button } from "@/components/ui/button"
import { Loader2, Mail } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Mail className="h-4 w-4" /></Button>
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    </div>
  )
}
```

---

## Calendar

```tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

// Range selection
export function CalendarRangeDemo() {
  const [range, setRange] = React.useState<{ from: Date; to?: Date } | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}
```

---

## Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
```

---

## Carousel

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

export function CarouselDemo() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

---

## Checkbox

```tsx
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import * as React from "react"

const items = [
  { id: "recents", label: "Recents" },
  { id: "home", label: "Home" },
  { id: "applications", label: "Applications" },
]

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState<string[]>([])

  const toggle = (id: string) =>
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={item.id}
            checked={checked.includes(item.id)}
            onCheckedChange={() => toggle(item.id)}
          />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </div>
  )
}
```

---

## Command / CMDK

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import * as React from "react"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

---

## Combobox

```tsx
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((f) => f.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

---

## Data Table

```tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@example.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "monserrat44@example.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "silas22@example.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
]

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

## Date Picker

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
```

---

## Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Drawer

```tsx
"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  { goal: 400 }, { goal: 300 }, { goal: 200 },
  { goal: 300 }, { goal: 200 }, { goal: 278 },
  { goal: 189 }, { goal: 239 }, { goal: 300 },
  { goal: 200 }, { goal: 278 }, { goal: 189 },
  { goal: 349 },
]

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setGoal(Math.max(200, goal - 10))} disabled={goal <= 200}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">Calories/day</div>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => setGoal(Math.min(400, goal + 10))} disabled={goal >= 400}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="goal" style={{ fill: "hsl(var(--foreground))", opacity: 0.9 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```

---

## Dropdown Menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Form (react-hook-form + zod)

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }).max(30),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string({ required_error: "Please select a role." }),
  bio: z.string().max(160).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ProfileForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", bio: "" },
  })

  function onSubmit(values: FormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-lg">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Max 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## Hover Card

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

---

## Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  )
}
```

---

## Input OTP

```tsx
"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import * as React from "react"

export function InputOTPDemo() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-4">
      <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? "Enter your one-time password." : <>You entered: <b>{value}</b></>}
      </div>
    </div>
  )
}
```

---

## Label

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function LabelDemo() {
  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
```

---

## Navigation Menu

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import * as React from "react"

const components: { title: string; href: string; description: string }[] = [
  { title: "Alert Dialog", href: "/docs/primitives/alert-dialog", description: "A modal dialog that interrupts the user with important content." },
  { title: "Hover Card", href: "/docs/primitives/hover-card", description: "For sighted users to preview content available behind a link." },
  { title: "Progress", href: "/docs/primitives/progress", description: "Displays an indicator showing the completion progress of a task." },
  { title: "Scroll-area", href: "/docs/primitives/scroll-area", description: "Visually or semantically separates content." },
  { title: "Tabs", href: "/docs/primitives/tabs", description: "A set of layered sections of content—known as tab panels." },
  { title: "Tooltip", href: "/docs/primitives/tooltip", description: "A popup that displays information related to an element." },
]

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
)
ListItem.displayName = "ListItem"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                    <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">Re-usable components built using Radix UI and Tailwind CSS.</ListItem>
              <ListItem href="/docs/installation" title="Installation">How to install dependencies and structure your app.</ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">Styles for headings, paragraphs, lists...etc</ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/docs">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

---

## Pagination

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

---

## Popover

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

---

## Progress

```tsx
"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
```

---

## Radio Group

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
```

---

## Resizable

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

---

## Scroll Area

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.${a.length - i}`)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

---

## Select

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

---

## Separator

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
```

---

## Sheet

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

---

## Sidebar

```tsx
"use client"

import * as React from "react"
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <p className="p-4">Main content here</p>
      </main>
    </SidebarProvider>
  )
}
```

---

## Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

---

## Slider

```tsx
"use client"

import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type SliderProps = React.ComponentProps<typeof Slider>

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}

export function SliderRangeDemo() {
  return (
    <Slider
      defaultValue={[25, 75]}
      max={100}
      step={1}
      className="w-[60%]"
    />
  )
}
```

---

## Sonner Toast

```tsx
"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
// In layout.tsx or root: import { Toaster } from "@/components/ui/sonner"
// <Toaster />

export function SonnerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created.")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Profile updated successfully.")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("You are almost out of storage.")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("A new update is available.")}>
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created.", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: { label: "Undo", onClick: () => console.log("Undo") },
          })
        }
      >
        With Action
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const promise = () => new Promise<void>((resolve) => setTimeout(resolve, 2000))
          toast.promise(promise, {
            loading: "Loading...",
            success: "Data loaded!",
            error: "Error loading data.",
          })
        }}
      >
        Promise
      </Button>
    </div>
  )
}
```

---

## Switch

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

---

## Table

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
]

export function TableDemo() {
  return (
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
```

---

## Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
```

---

## Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TextareaDemo() {
  return (
    <div className="grid w-full gap-2 max-w-sm">
      <Label htmlFor="message">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message" />
      <Button>Send message</Button>
    </div>
  )
}
```

---

## Toast

```tsx
"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
// In layout.tsx or root: import { Toaster } from "@/components/ui/toaster"
// <Toaster />

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast({ description: "Your message has been sent." })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
      >
        Destructive
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
          })
        }
      >
        With Action
      </Button>
    </div>
  )
}
```

---

## Toggle

```tsx
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

export function ToggleDemo() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline" size="sm">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle disabled" disabled>
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
```

---

## Tooltip

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

---

# NextUI / HeroUI — Complete Reference

> Install: `npm install @nextui-org/react framer-motion`
> Wrap app: `import { NextUIProvider } from "@nextui-org/react"` → `<NextUIProvider>`

---

## Accordion

```tsx
import { Accordion, AccordionItem } from "@nextui-org/react"

export function AccordionDemo() {
  return (
    <Accordion variant="splitted" selectionMode="multiple">
      <AccordionItem key="1" aria-label="Chung Miller" title="Chung Miller" subtitle="Press to expand" startContent={<span>👤</span>}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AccordionItem>
      <AccordionItem key="2" aria-label="Janelle Lenard" title="Janelle Lenard" subtitle="4 unread messages">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Zoey Lang" title="Zoey Lang" subtitle="3 incidences this week" classNames={{ subtitle: "text-warning" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </AccordionItem>
    </Accordion>
  )
}
```

---

## Autocomplete

```tsx
"use client"

import { Autocomplete, AutocompleteItem } from "@nextui-org/react"

const animals = [
  { label: "Cat", value: "cat", description: "The best pet ever" },
  { label: "Dog", value: "dog", description: "Man's best friend" },
  { label: "Elephant", value: "elephant", description: "Never forgets" },
  { label: "Lion", value: "lion", description: "King of the jungle" },
  { label: "Tiger", value: "tiger", description: "Striped big cat" },
]

export function AutocompleteDemo() {
  return (
    <Autocomplete
      label="Select an animal"
      placeholder="Search an animal"
      defaultItems={animals}
      className="max-w-xs"
      variant="bordered"
      description="Choose your favorite animal"
    >
      {(animal) => (
        <AutocompleteItem key={animal.value} description={animal.description}>
          {animal.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
```

---

## Avatar

```tsx
import { Avatar, AvatarGroup } from "@nextui-org/react"

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Sizes */}
      <div className="flex gap-3 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" size="lg" />
      </div>
      {/* With fallback name */}
      <div className="flex gap-3 items-center">
        <Avatar name="Junior Garcia" />
        <Avatar name="Jane Doe" color="secondary" />
        <Avatar name="Joe Smith" color="success" />
      </div>
      {/* Group */}
      <AvatarGroup isBordered max={3}>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      </AvatarGroup>
    </div>
  )
}
```

---

## Badge

```tsx
import { Badge, Avatar, Button } from "@nextui-org/react"
import { NotificationIcon } from "./NotificationIcon" // any icon

export function BadgeDemo() {
  return (
    <div className="flex gap-4 items-center">
      <Badge content="5" color="danger">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </Badge>
      <Badge content="New" color="success" shape="rectangle">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Badge>
      <Badge content="99+" color="warning" size="sm">
        <Button radius="full" isIconOnly variant="light" aria-label="notifications">
          🔔
        </Button>
      </Badge>
      <Badge content="" color="danger" shape="circle" placement="bottom-right">
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      </Badge>
    </div>
  )
}
```

---

## Button

```tsx
import { Button } from "@nextui-org/react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button variant="bordered" color="primary">Bordered</Button>
      <Button variant="light" color="primary">Light</Button>
      <Button variant="flat" color="primary">Flat</Button>
      <Button variant="faded" color="primary">Faded</Button>
      <Button variant="shadow" color="primary">Shadow</Button>
      <Button variant="ghost" color="primary">Ghost</Button>
      <Button isLoading color="primary">Loading</Button>
      <Button isDisabled>Disabled</Button>
      <Button radius="full" color="primary">Pill</Button>
      <Button size="sm" color="primary">Small</Button>
      <Button size="lg" color="primary">Large</Button>
    </div>
  )
}
```

---

## Calendar

```tsx
"use client"

import { Calendar } from "@nextui-org/react"
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date"
import { useLocale } from "@react-aria/i18n"

export function CalendarDemo() {
  const { locale } = useLocale()
  const now = today(getLocalTimeZone())
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
  ]

  return (
    <Calendar
      aria-label="Date (Unavailable)"
      isDateUnavailable={(date) =>
        isWeekend(date, locale) ||
        disabledRanges.some((interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0)
      }
      minValue={today(getLocalTimeZone())}
    />
  )
}
```

---

## Card

```tsx
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react"

export function CardDemo() {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Basic card */}
      <Card className="py-4 max-w-xs">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
      </Card>

      {/* Hoverable + pressable */}
      <Card isPressable isHoverable className="max-w-xs">
        <CardBody>
          <Image src="https://nextui.org/images/fruit-1.jpeg" width={200} alt="Apple" className="rounded-xl" />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>Apple</b>
          <p className="text-default-500">$5.50</p>
        </CardFooter>
      </Card>

      {/* Blurred footer */}
      <Card isFooterBlurred className="max-w-xs">
        <Image removeWrapper alt="Relaxing app background" className="z-0 w-full h-full object-cover" src="https://nextui.org/images/card-example-6.jpeg" />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Available soon.</p>
              <p className="text-tiny text-white/60">Get notified.</p>
            </div>
          </div>
          <Button radius="full" size="sm">Notify Me</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
```

---

## Checkbox

```tsx
"use client"

import { Checkbox, CheckboxGroup } from "@nextui-org/react"
import * as React from "react"

export function CheckboxDemo() {
  const [selected, setSelected] = React.useState<string[]>(["buenos-aires", "london"])

  return (
    <div className="flex flex-col gap-4">
      {/* Single */}
      <Checkbox defaultSelected color="secondary">Subscribe to newsletter</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>

      {/* Group */}
      <CheckboxGroup
        label="Select cities"
        value={selected}
        onValueChange={setSelected}
        color="warning"
        description="Choose cities to visit"
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">Selected: {selected.join(", ")}</p>
    </div>
  )
}
```

---

## Chip

```tsx
import { Chip, Avatar } from "@nextui-org/react"

export function ChipDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip>Default</Chip>
      <Chip color="primary">Primary</Chip>
      <Chip color="secondary">Secondary</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
      <Chip variant="bordered" color="primary">Bordered</Chip>
      <Chip variant="flat" color="secondary">Flat</Chip>
      <Chip variant="faded" color="success">Faded</Chip>
      <Chip variant="shadow" color="danger">Shadow</Chip>
      <Chip onClose={() => console.log("closed")} variant="flat" color="warning">Closeable</Chip>
      <Chip avatar={<Avatar name="JW" size="sm" />} variant="flat">Avatar</Chip>
      <Chip startContent={<span>🎉</span>} variant="flat" color="primary">With Icon</Chip>
    </div>
  )
}
```

---

## Circular Progress

```tsx
import { CircularProgress, Card, CardBody } from "@nextui-org/react"

export function CircularProgressDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <CircularProgress aria-label="Loading..." />
      <CircularProgress size="lg" value={70} color="warning" label="Loading..." />
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={70}
        color="success"
        showValueLabel
      />
      <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
        <CardBody className="justify-center items-center pb-0">
          <CircularProgress
            classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              indicator: "stroke-white",
              track: "stroke-white/10",
              value: "text-3xl font-semibold text-white",
            }}
            value={70}
            strokeWidth={4}
            showValueLabel
          />
        </CardBody>
      </Card>
    </div>
  )
}
```

---

## Date Picker

```tsx
"use client"

import { DatePicker, DateRangePicker } from "@nextui-org/react"
import { today, getLocalTimeZone } from "@internationalized/date"

export function DatePickerDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <DatePicker
        label="Birth date"
        variant="bordered"
        description="Enter your birth date"
        className="max-w-[284px]"
        showMonthAndYearPickers
      />
      <DateRangePicker
        label="Stay duration"
        className="max-w-xs"
        variant="bordered"
        minValue={today(getLocalTimeZone())}
        visibleMonths={2}
        pageBehavior="single"
      />
    </div>
  )
}
```

---

## Drawer

```tsx
"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"

export function DrawerDemo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Drawer</Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right" size="md">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                  risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus,
                  sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={onClose}>Action</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
```

---

## Dropdown

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Avatar,
  User,
} from "@nextui-org/react"

export function DropdownDemo() {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection showDivider>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
```

---

## Image

```tsx
import { Image } from "@nextui-org/react"

export function ImageDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Basic */}
      <Image
        width={300}
        alt="NextUI hero Image"
        src="https://nextui.org/images/hero-card-complete.jpeg"
      />

      {/* With zoom */}
      <Image
        isZoomed
        width={240}
        alt="NextUI Fruit Image with Zoom"
        src="https://nextui.org/images/fruit-1.jpeg"
      />

      {/* Blurred */}
      <Image
        isBlurred
        width={240}
        alt="NextUI Album Cover"
        src="https://nextui.org/images/album-cover.png"
      />

      {/* With fallback */}
      <Image
        width={300}
        src="invalid-url"
        fallbackSrc="https://via.placeholder.com/300x200"
        alt="Fallback image"
      />
    </div>
  )
}
```

---

## Input

```tsx
"use client"

import { Input } from "@nextui-org/react"
import * as React from "react"
import { EyeFilledIcon, EyeSlashFilledIcon, SearchIcon, MailIcon } from "./icons"

export function InputDemo() {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Input label="Email" placeholder="you@example.com" type="email" variant="bordered" />
      <Input
        label="Password"
        placeholder="Enter your password"
        variant="bordered"
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <Input
        label="Search"
        isClearable
        radius="lg"
        placeholder="Type to search..."
        startContent={<SearchIcon />}
        variant="bordered"
      />
      <Input
        type="email"
        label="Email"
        placeholder="you@example.com"
        labelPlacement="outside"
        startContent={<MailIcon className="text-default-400" />}
        variant="bordered"
        description="We'll never share your email."
        isRequired
      />
      <Input label="Invalid" placeholder="Enter value" isInvalid errorMessage="Please enter a valid value" variant="bordered" />
    </div>
  )
}
```

---

## Kbd

```tsx
import { Kbd } from "@nextui-org/react"

export function KbdDemo() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Kbd keys={["command"]}>K</Kbd>
      <Kbd keys={["shift", "enter"]}>Enter</Kbd>
      <Kbd keys={["ctrl"]}>C</Kbd>
      <Kbd keys={["option", "command"]}>T</Kbd>
      <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={["command"]}>K</Kbd>
    </div>
  )
}
```

---

## Link

```tsx
import { Link } from "@nextui-org/react"

export function LinkDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="#">Default Link</Link>
      <Link href="#" color="primary">Primary</Link>
      <Link href="#" color="secondary">Secondary</Link>
      <Link href="#" color="success">Success</Link>
      <Link href="#" color="warning">Warning</Link>
      <Link href="#" color="danger">Danger</Link>
      <Link href="#" isExternal showAnchorIcon>External Link</Link>
      <Link href="#" size="sm">Small</Link>
      <Link href="#" size="lg">Large</Link>
      <Link href="#" isBlock color="primary">Block</Link>
      <Link href="#" isDisabled>Disabled</Link>
    </div>
  )
}
```

---

## Listbox

```tsx
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react"
import { DeleteDocumentIcon, EditDocumentIcon, AddNoteIcon, CopyDocumentIcon } from "./icons"

export function ListboxDemo() {
  return (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        <ListboxSection title="Actions" showDivider>
          <ListboxItem
            key="new"
            description="Create a new file"
            startContent={<AddNoteIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
          >
            New file
          </ListboxItem>
          <ListboxItem
            key="copy"
            description="Copy the file link"
            startContent={<CopyDocumentIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
          >
            Copy link
          </ListboxItem>
          <ListboxItem
            key="edit"
            description="Allows you to edit the file"
            startContent={<EditDocumentIcon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />}
          >
            Edit file
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Danger zone">
          <ListboxItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Permanently delete the file"
            startContent={<DeleteDocumentIcon className="text-xl text-danger pointer-events-none flex-shrink-0" />}
          >
            Delete file
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  )
}
```

---

## Modal

```tsx
"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react"

export function ModalDemo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <span className="text-sm text-default-400 cursor-pointer">Forgot password?</span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={onClose}>Sign in</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
```

---

## Navbar

```tsx
"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react"
import * as React from "react"

export function NavbarDemo() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = ["Profile", "Dashboard", "Activity", "Analytics", "System", "Deployments", "My Settings", "Team Settings", "Help & Feedback", "Log Out"]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">Features</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">Customers</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">Integrations</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">Sign Up</Button>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
```

---

## Pagination

```tsx
"use client"

import { Pagination } from "@nextui-org/react"
import * as React from "react"

export function PaginationDemo() {
  const [currentPage, setCurrentPage] = React.useState(1)

  return (
    <div className="flex flex-col gap-4 items-center">
      <Pagination total={10} initialPage={1} />
      <Pagination total={10} color="secondary" variant="flat" />
      <Pagination total={10} color="success" variant="faded" showControls />
      <Pagination
        total={10}
        page={currentPage}
        onChange={setCurrentPage}
        color="warning"
        showShadow
        boundaries={2}
        siblings={1}
      />
      <p className="text-small text-default-500">Current page: {currentPage}</p>
    </div>
  )
}
```

---

## Popover

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react"

export function PopoverDemo() {
  return (
    <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button color="warning" variant="flat">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>Dimensions</p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
              <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
              <Input defaultValue="25px" label="Height" size="sm" variant="bordered" />
              <Input defaultValue="25px" label="Max. height" size="sm" variant="bordered" />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
```

---

## Progress

```tsx
import { Progress } from "@nextui-org/react"

export function ProgressDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Progress size="sm" radius="sm" classNames={{ base: "max-w-md", indicator: "bg-gradient-to-r from-pink-500 to-yellow-500" }} label="Gradient" value={55} />
      <Progress color="default" label="Default" value={40} showValueLabel />
      <Progress color="primary" label="Primary" value={60} showValueLabel />
      <Progress color="secondary" label="Secondary" value={70} showValueLabel />
      <Progress color="success" label="Success" value={80} showValueLabel />
      <Progress color="warning" label="Warning" value={50} showValueLabel />
      <Progress color="danger" label="Danger" value={30} showValueLabel />
      <Progress isIndeterminate label="Indeterminate" size="sm" color="secondary" />
      <Progress isStriped color="success" label="Striped" value={55} />
    </div>
  )
}
```

---

## Radio Group

```tsx
"use client"

import { Radio, RadioGroup } from "@nextui-org/react"
import * as React from "react"
import { cn } from "@nextui-org/react"

export function RadioGroupDemo() {
  const [selected, setSelected] = React.useState("london")

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        label="Select your favorite city"
        value={selected}
        onValueChange={setSelected}
        color="warning"
        description="Choose from available cities"
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-default-500 text-small">Selected: {selected}</p>

      {/* Horizontal orientation */}
      <RadioGroup label="Plan" orientation="horizontal" defaultValue="monthly">
        <Radio value="monthly">Monthly</Radio>
        <Radio value="yearly">Yearly</Radio>
        <Radio value="lifetime">Lifetime</Radio>
      </RadioGroup>
    </div>
  )
}
```

---

## Select

```tsx
"use client"

import { Select, SelectItem, SelectSection, Avatar, Chip } from "@nextui-org/react"
import * as React from "react"

const animals = [
  { label: "Cat", value: "cat", description: "The best pet ever" },
  { label: "Dog", value: "dog", description: "Man's best friend" },
  { label: "Elephant", value: "elephant", description: "Never forgets" },
  { label: "Lion", value: "lion", description: "King of the jungle" },
  { label: "Tiger", value: "tiger", description: "Striped big cat" },
]

export function SelectDemo() {
  const [value, setValue] = React.useState(new Set<string>([]))

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      {/* Basic */}
      <Select label="Favorite Animal" placeholder="Select an animal" className="max-w-xs" variant="bordered">
        {animals.map((animal) => (
          <SelectItem key={animal.value} description={animal.description}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      {/* Multi-select */}
      <Select
        label="Favorite Animals"
        placeholder="Select animals"
        selectionMode="multiple"
        className="max-w-xs"
        variant="bordered"
        selectedKeys={value}
        onSelectionChange={(keys) => setValue(keys as Set<string>)}
        renderValue={(items) => (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.textValue}</Chip>
            ))}
          </div>
        )}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value}>{animal.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
```

---

## Skeleton

```tsx
import { Skeleton, Card } from "@nextui-org/react"

export function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Card skeleton */}
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>

      {/* Text skeleton */}
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
```

---

## Slider

```tsx
"use client"

import { Slider } from "@nextui-org/react"

export function SliderDemo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md items-start justify-center">
      <Slider
        label="Select a budget"
        formatOptions={{ style: "currency", currency: "USD" }}
        step={10}
        maxValue={1000}
        minValue={0}
        defaultValue={[100, 500]}
        className="max-w-md"
      />
      <Slider
        size="sm"
        step={0.01}
        color="foreground"
        label="Temperature"
        showSteps
        maxValue={1}
        minValue={0}
        defaultValue={0.2}
        className="max-w-md"
      />
      <Slider
        label="Volume"
        size="lg"
        color="danger"
        startContent={<span>🔇</span>}
        endContent={<span>🔊</span>}
        className="max-w-md"
        defaultValue={60}
      />
      <Slider
        label="Music Volume"
        step={5}
        maxValue={100}
        minValue={0}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
        defaultValue={20}
        className="max-w-md"
      />
    </div>
  )
}
```

---

## Snippet

```tsx
import { Snippet } from "@nextui-org/react"

export function SnippetDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Snippet>npm install @nextui-org/react</Snippet>
      <Snippet color="primary" variant="flat">npx create-next-app@latest</Snippet>
      <Snippet color="secondary" variant="bordered" symbol="#">sudo apt-get install nodejs</Snippet>
      <Snippet color="success" symbol="" hideSymbol>yarn add @nextui-org/react</Snippet>
      <Snippet color="warning" variant="shadow">pnpm install @nextui-org/react</Snippet>
      <Snippet hideCopyButton variant="flat" color="danger">This cannot be copied</Snippet>
    </div>
  )
}
```

---

## Spinner

```tsx
import { Spinner } from "@nextui-org/react"

export function SpinnerDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="danger" />
      <Spinner label="Loading..." color="secondary" labelColor="secondary" />
    </div>
  )
}
```

---

## Switch

```tsx
"use client"

import { Switch, cn } from "@nextui-org/react"
import * as React from "react"

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch defaultSelected aria-label="Automatic updates" />
      <Switch defaultSelected color="secondary">Enable feature</Switch>
      <Switch size="sm" color="success">Small</Switch>
      <Switch size="lg" color="warning">Large</Switch>
      <Switch isDisabled>Disabled</Switch>
      <Switch
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary",
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            "group-data-[selected=true]:ml-6",
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4",
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">Enable early access</p>
          <p className="text-tiny text-default-400">Get access to new features before they are released.</p>
        </div>
      </Switch>
    </div>
  )
}
```

---

## Table

```tsx
"use client"

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Pagination,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react"
import * as React from "react"

type UserData = {
  id: number
  name: string
  role: string
  team: string
  status: "active" | "paused" | "vacation"
  age: string
  avatar: string
  email: string
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

const users: UserData[] = [
  { id: 1, name: "Tony Reichert", role: "CEO", team: "Management", status: "active", age: "29", avatar: "https://i.pravatar.cc/150?img=1", email: "tony@example.com" },
  { id: 2, name: "Zoey Lang", role: "Tech Lead", team: "Development", status: "paused", age: "25", avatar: "https://i.pravatar.cc/150?img=2", email: "zoey@example.com" },
  { id: 3, name: "Jane Fisher", role: "Sr. Dev", team: "Development", status: "active", age: "22", avatar: "https://i.pravatar.cc/150?img=3", email: "jane@example.com" },
  { id: 4, name: "William Howard", role: "C.M.", team: "Marketing", status: "vacation", age: "28", avatar: "https://i.pravatar.cc/150?img=4", email: "william@example.com" },
  { id: 5, name: "Emily Collins", role: "UX", team: "Design", status: "active", age: "27", avatar: "https://i.pravatar.cc/150?img=5", email: "emily@example.com" },
]

export function TableDemo() {
  const [filterValue, setFilterValue] = React.useState("")
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 4

  const filteredItems = users.filter((u) =>
    u.name.toLowerCase().includes(filterValue.toLowerCase())
  )
  const pages = Math.ceil(filteredItems.length / rowsPerPage)
  const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const renderCell = (user: UserData, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <User avatarProps={{ radius: "lg", src: user.avatar }} description={user.email} name={user.name}>{user.email}</User>
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.role}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        )
      case "status":
        return <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">{user.status}</Chip>
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details"><Button isIconOnly size="sm" variant="light">👁</Button></Tooltip>
            <Tooltip content="Edit"><Button isIconOnly size="sm" variant="light">✏️</Button></Tooltip>
            <Tooltip color="danger" content="Delete"><Button isIconOnly size="sm" color="danger" variant="light">🗑</Button></Tooltip>
          </div>
        )
      default:
        return <>{(user as Record<string, unknown>)[columnKey as string]}</>
    }
  }

  return (
    <Table
      aria-label="Users table"
      topContent={
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
        </div>
      }
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={setPage} />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="actions">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
```

---

## Tabs

```tsx
"use client"

import { Tabs, Tab, Card, CardBody, CardHeader, Image } from "@nextui-org/react"

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Basic */}
      <Tabs aria-label="Options" color="primary" variant="underlined">
        <Tab key="photos" title="Photos">
          <Card>
            <CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>Duis aute irure dolor in reprehenderit in voluptate.</CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Variants */}
      <Tabs aria-label="Variants" variant="solid" color="secondary">
        <Tab key="all" title="All">All content</Tab>
        <Tab key="liked" title="Liked">Liked content</Tab>
        <Tab key="saved" title="Saved">Saved content</Tab>
      </Tabs>

      {/* Bordered + full width */}
      <Tabs aria-label="Full width" variant="bordered" fullWidth>
        <Tab key="login" title="Login">Login form</Tab>
        <Tab key="signup" title="Sign up">Sign up form</Tab>
      </Tabs>

      {/* Vertical */}
      <Tabs aria-label="Vertical" isVertical>
        <Tab key="html" title="HTML">HTML content</Tab>
        <Tab key="css" title="CSS">CSS content</Tab>
        <Tab key="js" title="JS">JavaScript content</Tab>
      </Tabs>
    </div>
  )
}
```

---

## Textarea

```tsx
import { Textarea } from "@nextui-org/react"

export function TextareaDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Textarea
        label="Description"
        placeholder="Enter your description"
        description="Enter a concise description of your project."
        className="max-w-xs"
        variant="bordered"
      />
      <Textarea
        isRequired
        label="Message"
        labelPlacement="outside"
        placeholder="Type your message here"
        variant="flat"
      />
      <Textarea
        isInvalid
        variant="flat"
        label="Invalid textarea"
        defaultValue="This is invalid"
        errorMessage="This field has an error."
      />
      <Textarea
        label="Autosize"
        placeholder="This textarea autosizes"
        minRows={2}
        maxRows={6}
        variant="bordered"
      />
    </div>
  )
}
```

---

## Tooltip

```tsx
import { Tooltip, Button } from "@nextui-org/react"

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Tooltip content="I am a tooltip">
        <Button variant="flat">Hover me</Button>
      </Tooltip>
      <Tooltip color="primary" content="Primary tooltip">
        <Button color="primary" variant="flat">Primary</Button>
      </Tooltip>
      <Tooltip color="secondary" content="Secondary tooltip">
        <Button color="secondary" variant="flat">Secondary</Button>
      </Tooltip>
      <Tooltip color="success" content="Success tooltip">
        <Button color="success" variant="flat">Success</Button>
      </Tooltip>
      <Tooltip color="warning" content="Warning tooltip">
        <Button color="warning" variant="flat">Warning</Button>
      </Tooltip>
      <Tooltip color="danger" content="Danger tooltip">
        <Button color="danger" variant="flat">Danger</Button>
      </Tooltip>
      <Tooltip placement="right" content="Right placement">
        <Button variant="flat">Right</Button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        showArrow
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">Custom Content</div>
            <div className="text-tiny">This is a custom tooltip content</div>
          </div>
        }
      >
        <Button variant="flat">Custom Content</Button>
      </Tooltip>
    </div>
  )
}
```
