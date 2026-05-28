# UI Component Libraries — Production Reference

---

## Framer Motion

> URL: https://www.framer.com/motion/

Declarative animation library for React with spring physics, gesture support, and layout animations. Best-in-class for complex entrance/exit sequences and shared layout transitions.

**Dependencies:** `npm install framer-motion`

### motion.div + variants

```tsx
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    transition: { duration: 0.2 },
  },
};

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="rounded-2xl bg-white p-6 shadow-md"
    >
      {children}
    </motion.div>
  );
}

// Staggered list
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function StaggeredList({ items }: { items: string[] }) {
  return (
    <motion.ul variants={listVariants} initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item} variants={cardVariants} className="py-2">
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### AnimatePresence — page/modal transitions

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.2 } },
};

export function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            variants={panelVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <p className="mt-2 text-gray-500">Modal content goes here.</p>
            <button onClick={onClose} className="mt-6 rounded-lg bg-black px-4 py-2 text-white">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### useScroll + useTransform — parallax hero

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900"
      />
      <motion.div style={{ opacity }} className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-6xl font-bold text-white">Scroll Down</h1>
      </motion.div>
    </div>
  );
}
```

---

## Radix UI

> URL: https://www.radix-ui.com/

Unstyled, accessible headless primitives with full keyboard navigation and ARIA compliance baked in. Compose with any styling system — zero visual opinions.

**Dependencies:** `npm install @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-toast`

### Dialog — accessible modal

```tsx
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function RadixDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
          Open Dialog
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            Edit Profile
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-gray-500">
            Make changes to your profile here. Click save when you are done.
          </Dialog.Description>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Display name"
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Email"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
                Cancel
              </button>
            </Dialog.Close>
            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700">
              Save changes
            </button>
          </div>

          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### DropdownMenu — context menu

```tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

export function RadixDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[180px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95"
          sideOffset={8}
        >
          <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
            <Edit className="h-4 w-4 text-gray-500" /> Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
            <Copy className="h-4 w-4 text-gray-500" /> Duplicate
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
              <ChevronRight className="ml-auto h-4 w-4 text-gray-400" /> More options
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="z-50 min-w-[160px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95">
                <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-gray-100">
                  Archive
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />

          <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-50">
            <Trash className="h-4 w-4" /> Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
```

### Tooltip — with delay and side offset

```tsx
import * as Tooltip from "@radix-ui/react-tooltip";

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      {children}
    </Tooltip.Provider>
  );
}

export function RadixTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={6}
        >
          {label}
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

// Usage
// <TooltipProvider>
//   <RadixTooltip label="Copy to clipboard">
//     <button>Copy</button>
//   </RadixTooltip>
// </TooltipProvider>
```

---

## shadcn/ui Extras

> URL: https://ui.shadcn.com/

Extended shadcn components that go beyond the basics — data-heavy and interaction-heavy patterns built on Radix + Tailwind.

**Dependencies:** `npx shadcn-ui@latest add calendar data-table combobox` + `npm install @tanstack/react-table cmdk date-fns`

### Combobox — searchable select

```tsx
"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "sveltekit", label: "SvelteKit" },
];

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(current) => {
                  setValue(current === value ? "" : current);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

### DataTable — with sorting + filtering

```tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Payment = { id: string; amount: number; status: "pending" | "processing" | "success" | "failed"; email: string };

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        success: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        failed: "bg-red-100 text-red-700",
        processing: "bg-blue-100 text-blue-700",
      };
      return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors[status]}`}>
          {status}
        </span>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Amount <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="font-medium">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</div>;
    },
  },
];

export function DataTable({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter all columns..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-xl border">
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
            {table.getRowModel().rows.length ? (
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-400">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-gray-500">{table.getFilteredRowModel().rows.length} row(s)</p>
    </div>
  );
}
```

### MultiSelect — tag-style multi picker

```tsx
"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const OPTIONS = ["React", "Vue", "Angular", "Svelte", "SolidJS", "Qwik", "Next.js", "Remix", "Astro"];

export function MultiSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) =>
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex min-h-10 w-full cursor-pointer flex-wrap gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2">
          {selected.length === 0 && <span className="text-sm text-gray-400">Select frameworks...</span>}
          {selected.map((s) => (
            <Badge key={s} variant="secondary" className="gap-1">
              {s}
              <button
                onClick={(e) => { e.stopPropagation(); toggle(s); }}
                className="ml-1 rounded-full hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandGroup>
            {OPTIONS.map((option) => (
              <CommandItem key={option} onSelect={() => toggle(option)} className="cursor-pointer">
                <span className={`mr-2 h-4 w-4 rounded border ${selected.includes(option) ? "bg-violet-600 border-violet-600" : "border-gray-300"}`} />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

---

## Headless UI

> URL: https://headlessui.com/

Tailwind Labs' unstyled accessible component set. Pairs perfectly with Tailwind CSS and ships with React + Vue support.

**Dependencies:** `npm install @headlessui/react`

### Transition — smooth mount/unmount

```tsx
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export function FadePanel() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShow((s) => !s)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        Toggle
      </button>

      <Transition
        as={Fragment}
        show={show}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <div className="mt-4 rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
          <p className="text-sm text-gray-600">This panel animates in and out cleanly.</p>
        </div>
      </Transition>
    </div>
  );
}
```

### Disclosure — accordion/FAQ

```tsx
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is Headless UI?", a: "A set of unstyled, accessible UI components for React and Vue." },
  { q: "Does it work with Tailwind?", a: "Yes — it was built by Tailwind Labs specifically for Tailwind CSS projects." },
  { q: "Is it production ready?", a: "Absolutely. It powers Tailwind UI and is used across thousands of production apps." },
];

export function FAQ() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-2">
      {faqs.map(({ q, a }) => (
        <Disclosure key={q}>
          {({ open }) => (
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
              <Disclosure.Button className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50">
                {q}
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0 -translate-y-1"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-out"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-1"
              >
                <Disclosure.Panel className="px-5 pb-4 text-sm text-gray-500">{a}</Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
```

### Listbox — styled select replacement

```tsx
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Fragment, useState } from "react";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
];

export function StyledListbox() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-64">
        <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <span>{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          </span>
        </Listbox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 mt-1 w-full overflow-auto rounded-xl bg-white py-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none">
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-4 py-2.5 text-sm ${active ? "bg-indigo-50 text-indigo-900" : "text-gray-900"}`
                }
              >
                {({ selected }) => (
                  <span className="flex items-center gap-2">
                    {selected && <Check className="h-4 w-4 text-indigo-600" />}
                    <span className={selected ? "font-medium" : "font-normal"}>{person.name}</span>
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
```

---

## Vaul

> URL: https://vaul.emilkowal.ski/

Drawer component built for mobile — snap points, elastic overscroll, and native-feel drag dismissal. Created by Emil Kowalski (Vercel).

**Dependencies:** `npm install vaul`

### Bottom sheet drawer with snap points

```tsx
import { Drawer } from "vaul";

export function BottomDrawer() {
  return (
    <Drawer.Root snapPoints={[0.4, 1]} defaultSnap={0.4}>
      <Drawer.Trigger asChild>
        <button className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white">
          Open Drawer
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[20px] bg-white outline-none">
          {/* Drag handle */}
          <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-gray-200" />

          <div className="flex-1 overflow-y-auto p-6">
            <Drawer.Title className="text-lg font-semibold text-gray-900">
              Sheet Title
            </Drawer.Title>
            <Drawer.Description className="mt-2 text-sm text-gray-500">
              This drawer snaps to 40% and 100% height. Drag it up to expand or down to dismiss.
            </Drawer.Description>

            <div className="mt-6 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

### Nested drawer

```tsx
import { Drawer } from "vaul";

export function NestedDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white">
          Open Parent
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] bg-white p-6 outline-none">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
          <h2 className="text-lg font-semibold">Parent Drawer</h2>

          <Drawer.NestedRoot>
            <Drawer.Trigger asChild>
              <button className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50">
                Open Nested Drawer
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[60] rounded-t-[20px] bg-white p-6 outline-none">
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
                <h3 className="text-base font-semibold">Nested Drawer</h3>
                <p className="mt-2 text-sm text-gray-500">This drawer sits on top of the parent drawer.</p>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.NestedRoot>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

---

## Sonner

> URL: https://sonner.emilkowal.ski/

Opinionated toast notification system. Stacks, queues, and auto-dismisses. Handles promises, rich content, and action buttons natively.

**Dependencies:** `npm install sonner`

### Setup + all toast types

```tsx
// In your root layout
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          expand
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: "rounded-xl font-sans",
            },
          }}
        />
      </body>
    </html>
  );
}
```

```tsx
"use client";

import { toast } from "sonner";

export function ToastExamples() {
  const handlePromise = () => {
    const promise = new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: "Deployment" }), 2000)
    );

    toast.promise(promise, {
      loading: "Deploying...",
      success: (data) => `${data.name} deployed successfully!`,
      error: "Deployment failed.",
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => toast("Default toast")} className="rounded-lg border px-3 py-2 text-sm">
        Default
      </button>
      <button onClick={() => toast.success("Changes saved!")} className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-700">
        Success
      </button>
      <button onClick={() => toast.error("Something went wrong.")} className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
        Error
      </button>
      <button onClick={() => toast.warning("Unsaved changes.")} className="rounded-lg bg-yellow-100 px-3 py-2 text-sm text-yellow-700">
        Warning
      </button>
      <button onClick={() => toast.info("New update available.")} className="rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700">
        Info
      </button>
      <button onClick={handlePromise} className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white">
        Promise
      </button>
      <button
        onClick={() =>
          toast("File deleted", {
            description: "invoice_2024.pdf has been removed.",
            action: { label: "Undo", onClick: () => toast.success("Restored!") },
          })
        }
        className="rounded-lg border px-3 py-2 text-sm"
      >
        With Action
      </button>
    </div>
  );
}
```

---

## CMDK

> URL: https://cmdk.paco.me/

Command palette primitive — powers shadcn/ui's Command component. Fuzzy search, keyboard navigation, nested pages, and async results.

**Dependencies:** `npm install cmdk`

### Full command palette with pages

```tsx
"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Calculator, Calendar, FileText, Laptop, Moon, Settings, Sun, User } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<"root" | "theme">("root");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm"
      >
        Search... <kbd className="ml-auto rounded bg-gray-100 px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]" onClick={() => { setOpen(false); setPage("root"); }}>
      <Command
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input
          autoFocus
          placeholder={page === "root" ? "Type a command or search..." : "Change theme..."}
          className="w-full border-b border-gray-100 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-gray-400"
        />

        <Command.List className="max-h-[360px] overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-gray-400">
            No results found.
          </Command.Empty>

          {page === "root" && (
            <>
              <Command.Group heading="Pages" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-400">
                {[
                  { icon: FileText, label: "Documents" },
                  { icon: Calendar, label: "Calendar" },
                  { icon: User, label: "Profile" },
                ].map(({ icon: Icon, label }) => (
                  <Command.Item
                    key={label}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 aria-selected:bg-gray-100"
                  >
                    <Icon className="h-4 w-4 text-gray-400" />
                    {label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Settings" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-400">
                <Command.Item
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 aria-selected:bg-gray-100"
                  onSelect={() => setPage("theme")}
                >
                  <Sun className="h-4 w-4 text-gray-400" />
                  Change Theme
                  <span className="ml-auto text-xs text-gray-400">→</span>
                </Command.Item>
                <Command.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 aria-selected:bg-gray-100">
                  <Settings className="h-4 w-4 text-gray-400" />
                  Preferences
                </Command.Item>
              </Command.Group>
            </>
          )}

          {page === "theme" && (
            <Command.Group heading="Theme">
              {[
                { icon: Sun, label: "Light" },
                { icon: Moon, label: "Dark" },
                { icon: Laptop, label: "System" },
              ].map(({ icon: Icon, label }) => (
                <Command.Item
                  key={label}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 aria-selected:bg-gray-100"
                  onSelect={() => { setOpen(false); setPage("root"); }}
                >
                  <Icon className="h-4 w-4 text-gray-400" />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>

        <div className="border-t border-gray-100 px-4 py-2.5 text-xs text-gray-400">
          <span className="mr-3"><kbd>↑↓</kbd> navigate</span>
          <span className="mr-3"><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </Command>
    </div>
  );
}
```

---

## Embla Carousel

> URL: https://www.embla-carousel.com/

Lightweight, extensible carousel with touch/pointer support, infinite looping, auto-scroll, and plugins. No opinion on markup or styles.

**Dependencies:** `npm install embla-carousel-react embla-carousel-autoplay`

### Touch carousel with dots + arrows

```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  { id: 1, color: "from-violet-500 to-indigo-600", title: "Slide One" },
  { id: 2, color: "from-rose-500 to-pink-600", title: "Slide Two" },
  { id: 3, color: "from-amber-500 to-orange-600", title: "Slide Three" },
  { id: 4, color: "from-emerald-500 to-teal-600", title: "Slide Four" },
];

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3500 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className={`flex h-64 items-center justify-center bg-gradient-to-br ${slide.color}`}>
                <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Thumb carousel

```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const IMAGES = [
  "https://picsum.photos/seed/a/800/500",
  "https://picsum.photos/seed/b/800/500",
  "https://picsum.photos/seed/c/800/500",
  "https://picsum.photos/seed/d/800/500",
  "https://picsum.photos/seed/e/800/500",
];

export function ThumbCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel();
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

  const onThumbClick = useCallback(
    (index: number) => { mainApi?.scrollTo(index); },
    [mainApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
  }, [mainApi, onSelect]);

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <div className="overflow-hidden rounded-xl" ref={mainRef}>
        <div className="flex">
          {IMAGES.map((src, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <img src={src} alt={`Slide ${i}`} className="h-64 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2">
          {IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className={`min-w-0 flex-[0_0_18%] overflow-hidden rounded-lg border-2 transition-all ${
                i === selectedIndex ? "border-indigo-500" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`Thumb ${i}`} className="h-14 w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## React Spring

> URL: https://www.react-spring.dev/

Spring-physics-based animation library for React. Handles interpolation, chaining, trails, and gestures without requiring keyframes.

**Dependencies:** `npm install @react-spring/web`

### useSpring — interactive card flip

```tsx
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    transform: `perspective(800px) rotateY(${flipped ? 180 : 0}deg)`,
    opacity: flipped ? 0 : 1,
    config: { mass: 1, tension: 300, friction: 30 },
  });

  return (
    <div
      className="relative h-48 w-72 cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Front */}
      <animated.div
        style={{ opacity, transform }}
        className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-xl"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest opacity-75">Click to flip</p>
          <p className="mt-1 text-2xl font-bold">Front Side</p>
        </div>
      </animated.div>

      {/* Back */}
      <animated.div
        style={{ opacity: opacity.to((o) => 1 - o), transform: transform.to((t) => `${t} rotateY(180deg)`) }}
        className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl"
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest opacity-75">Click to flip</p>
          <p className="mt-1 text-2xl font-bold">Back Side</p>
        </div>
      </animated.div>
    </div>
  );
}
```

### useTrail — staggered list entrance

```tsx
import { animated, useTrail } from "@react-spring/web";

const items = ["Design", "Develop", "Deploy", "Iterate"];

export function TrailList({ visible }: { visible: boolean }) {
  const trail = useTrail(items.length, {
    opacity: visible ? 1 : 0,
    x: visible ? 0 : 24,
    config: { tension: 280, friction: 24 },
    delay: 100,
  });

  return (
    <ul className="space-y-2">
      {trail.map((style, i) => (
        <animated.li
          key={items[i]}
          style={style}
          className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 px-5 py-3 text-sm font-medium text-indigo-800"
        >
          {items[i]}
        </animated.li>
      ))}
    </ul>
  );
}
```

### useSpring — number counter

```tsx
import { animated, useSpring } from "@react-spring/web";

export function AnimatedCounter({ to, label }: { to: number; label: string }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: to },
    config: { mass: 1, tension: 80, friction: 30 },
    delay: 300,
  });

  return (
    <div className="text-center">
      <animated.span className="text-5xl font-bold tabular-nums text-gray-900">
        {number.to((n) => Math.floor(n).toLocaleString())}
      </animated.span>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}
```

---

## Auto Animate

> URL: https://auto-animate.formkit.com/

One-line drop-in for layout animations. Add a single `useAutoAnimate` ref to any parent and list add/remove/reorder transitions happen automatically.

**Dependencies:** `npm install @formkit/auto-animate`

### Animated list — add/remove items

```tsx
"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";

let nextId = 4;

export function AnimatedList() {
  const [parent] = useAutoAnimate();
  const [items, setItems] = useState([
    { id: 1, text: "Buy groceries" },
    { id: 2, text: "Walk the dog" },
    { id: 3, text: "Read for 30 minutes" },
  ]);

  const add = () => {
    setItems((prev) => [...prev, { id: nextId++, text: `New task ${nextId - 1}` }]);
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <ul ref={parent} className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <span className="text-sm text-gray-700">{item.text}</span>
            <button
              onClick={() => remove(item.id)}
              className="rounded-lg p-1 hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={add}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500"
      >
        <Plus className="h-4 w-4" /> Add item
      </button>
    </div>
  );
}
```

### Animated tab panels

```tsx
"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

const tabs = [
  { id: "account", label: "Account", content: "Manage your account settings and preferences." },
  { id: "security", label: "Security", content: "Update your password and configure 2FA authentication." },
  { id: "notifications", label: "Notifications", content: "Choose what updates you want to receive." },
];

export function AnimatedTabs() {
  const [active, setActive] = useState("account");
  const [parent] = useAutoAnimate();

  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              active === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div ref={parent} className="mt-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div key={activeTab.id}>
          <h3 className="font-semibold text-gray-900">{activeTab.label}</h3>
          <p className="mt-2 text-sm text-gray-500">{activeTab.content}</p>
        </div>
      </div>
    </div>
  );
}
```

### Animated sort

```tsx
"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useState } from "react";

const initialPeople = ["Alice", "Charlie", "Bob", "Diana", "Edward", "Fiona"];

export function SortableList() {
  const [parent] = useAutoAnimate();
  const [items, setItems] = useState(initialPeople);
  const [asc, setAsc] = useState(true);

  const sort = () => {
    setItems((prev) => [...prev].sort((a, b) => (asc ? a.localeCompare(b) : b.localeCompare(a))));
    setAsc((v) => !v);
  };

  return (
    <div className="mx-auto max-w-xs">
      <button
        onClick={sort}
        className="mb-4 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
      >
        {asc ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpAZ className="h-4 w-4" />}
        Sort {asc ? "A → Z" : "Z → A"}
      </button>
      <ul ref={parent} className="space-y-2">
        {items.map((name) => (
          <li key={name} className="rounded-xl bg-gradient-to-r from-gray-50 to-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-100">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

*Last updated: 2026-05-28 — all snippets target React 18+ / Next.js 14+ App Router with TypeScript and Tailwind CSS v3.*
