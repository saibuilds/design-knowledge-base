# Origin UI Component Patterns

Origin UI is an MIT-licensed, shadcn/ui-compatible component library. All components work with shadcn/ui primitives and Tailwind CSS.

**Source:** https://originui.com  
**License:** MIT  
**Compatibility:** shadcn/ui, Radix UI, Tailwind CSS

---

## Installation

### 1. Install shadcn/ui (prerequisite)
```bash
npx shadcn@latest init
```

### 2. Add required shadcn primitives
```bash
npx shadcn@latest add button input card dialog command table
```

### 3. Install additional dependencies
```bash
npm install @radix-ui/react-dialog @radix-ui/react-popover cmdk
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
```

### 4. Utility function (already included with shadcn)
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 1. Animated Button Variants

### Shimmer Button
```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export function ShimmerButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium text-white transition-all",
        "bg-neutral-900 hover:scale-[1.02] active:scale-[0.98]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
  );
}
```

### Loading Button (with state)
```tsx
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success";

interface LoadingButtonProps {
  children: React.ReactNode;
  onClick: () => Promise<void>;
  className?: string;
}

export function LoadingButton({ children, onClick, className }: LoadingButtonProps) {
  const [state, setState] = useState<State>("idle");

  const handleClick = async () => {
    setState("loading");
    try {
      await onClick();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={state !== "idle"}
      className={cn("min-w-[120px] transition-all duration-200", className)}
    >
      {state === "loading" && <Loader2 size={16} className="animate-spin mr-2" />}
      {state === "success" && <Check size={16} className="mr-2" />}
      {state === "idle" ? children : state === "loading" ? "Loading..." : "Done!"}
    </Button>
  );
}
```

### Button Group
```tsx
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function ButtonGroup({ options, value, onChange }: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-xl border border-neutral-200 p-1 gap-1 bg-neutral-50">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            value === opt.value
              ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
              : "text-neutral-500 hover:text-neutral-700"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
```

### Icon Button with Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "ghost" | "outline";
}

export function IconButton({ icon, label, variant = "ghost", ...props }: IconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} size="icon" aria-label={label} {...props}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

---

## 2. Enhanced Input Components

### Input with Icon
```tsx
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function IconInput({ icon = <Search size={16} />, iconPosition = "left", className, ...props }: IconInputProps) {
  return (
    <div className="relative flex items-center">
      {iconPosition === "left" && (
        <span className="absolute left-3 text-neutral-400 pointer-events-none">{icon}</span>
      )}
      <Input
        className={cn(
          iconPosition === "left" ? "pl-9" : "pr-9",
          className
        )}
        {...props}
      />
      {iconPosition === "right" && (
        <span className="absolute right-3 text-neutral-400 pointer-events-none">{icon}</span>
      )}
    </div>
  );
}
```

### Password Input with Toggle
```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input type={visible ? "text" : "password"} className="pr-10" {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setVisible(!visible)}
        className="absolute right-0 top-0 h-full px-3 text-neutral-400 hover:text-neutral-700"
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  );
}
```

### OTP / Pin Input
```tsx
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function OTPInput({
  length = 6,
  onComplete,
}: {
  length?: number;
  onComplete?: (value: string) => void;
}) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...values];
    next[i] = value.slice(-1);
    setValues(next);

    if (value && i < length - 1) inputs.current[i + 1]?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(""));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 outline-none transition-all duration-200",
            val ? "border-indigo-500 bg-indigo-50" : "border-neutral-200 focus:border-indigo-400"
          )}
        />
      ))}
    </div>
  );
}
```

### Tags / Multi-value Input
```tsx
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TagInput({
  placeholder = "Add tag...",
  onChange,
}: {
  placeholder?: string;
  onChange?: (tags: string[]) => void;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const next = [...tags, trimmed];
      setTags(next);
      onChange?.(next);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    const next = tags.filter((t) => t !== tag);
    setTags(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-neutral-200 focus-within:border-indigo-400 transition-colors min-h-[48px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
        >
          {tag}
          <button onClick={() => removeTag(tag)} className="hover:text-indigo-900">
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent placeholder:text-neutral-400"
      />
    </div>
  );
}
```

---

## 3. Advanced Card Patterns

### Stat Card
```tsx
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, description, icon }: StatCardProps) {
  const positive = change >= 0;

  return (
    <div className="p-6 bg-white rounded-2xl border border-neutral-200 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <div className="p-2 bg-neutral-100 rounded-xl text-neutral-600">{icon}</div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-neutral-900">{value}</p>
        <div className="flex items-center gap-1.5">
          <span className={cn("flex items-center gap-0.5 text-sm font-medium", positive ? "text-green-600" : "text-red-500")}>
            {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-neutral-400">{description}</span>
        </div>
      </div>
    </div>
  );
}
```

### Feature Card (with gradient border)
```tsx
export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-2xl p-px bg-gradient-to-b from-neutral-200 to-transparent hover:from-indigo-300 transition-all duration-300">
      <div className="h-full rounded-2xl bg-white p-6 space-y-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
```

### Pricing Card
```tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export function PricingCard({
  name, price, period = "/mo", description, features, cta, featured = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 space-y-6 border",
        featured
          ? "bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105"
          : "bg-white border-neutral-200"
      )}
    >
      <div className="space-y-2">
        <p className={cn("text-sm font-medium", featured ? "text-indigo-200" : "text-neutral-500")}>{name}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className={cn("text-sm", featured ? "text-indigo-200" : "text-neutral-400")}>{period}</span>
        </div>
        <p className={cn("text-sm", featured ? "text-indigo-200" : "text-neutral-500")}>{description}</p>
      </div>

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check size={16} className={featured ? "text-indigo-200" : "text-indigo-600"} />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full",
          featured
            ? "bg-white text-indigo-600 hover:bg-indigo-50"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
      >
        {cta}
      </Button>
    </div>
  );
}
```

---

## 4. Command Palette (cmdk)

### Full Command Palette
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
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { File, Settings, User, Search, Home, BarChart2 } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 bg-neutral-100 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors"
      >
        <Search size={14} />
        <span>Search...</span>
        <kbd className="ml-4 text-xs bg-white border border-neutral-200 px-1.5 py-0.5 rounded-md">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => setOpen(false)}>
              <Home size={16} className="mr-2 text-neutral-400" />
              Dashboard
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <BarChart2 size={16} className="mr-2 text-neutral-400" />
              Analytics
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Files">
            <CommandItem>
              <File size={16} className="mr-2 text-neutral-400" />
              Create New File
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem>
              <User size={16} className="mr-2 text-neutral-400" />
              Profile Settings
            </CommandItem>
            <CommandItem>
              <Settings size={16} className="mr-2 text-neutral-400" />
              Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

### Inline Command Menu (no dialog)
```tsx
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export function InlineCommand({ onSelect }: { onSelect?: (value: string) => void }) {
  return (
    <Command className="rounded-xl border border-neutral-200 shadow-sm">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={onSelect}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

---

## 5. Data Tables with Sorting and Filtering

### Full-featured Data Table
```tsx
"use client";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Install: npm install @tanstack/react-table

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joined: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown size={14} />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-neutral-900">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-neutral-500 text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium">
        {row.getValue("role")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium text-neutral-500 hover:text-neutral-800"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown size={14} />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-neutral-100 text-neutral-500"
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", status === "active" ? "bg-green-500" : "bg-neutral-400")} />
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium text-neutral-500 hover:text-neutral-800"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joined
        <ArrowUpDown size={14} />
      </button>
    ),
  },
];

export function DataTable({ data }: { data: User[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-neutral-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          {table.getFilteredRowModel().rows.length} result(s)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={14} />
          </Button>
          <span className="text-sm text-neutral-600">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Notification / Alert Components

### Alert Banner
```tsx
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { useState } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

const config = {
  info: { icon: Info, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon_color: "text-blue-500" },
  success: { icon: CheckCircle2, bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon_color: "text-green-500" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", icon_color: "text-amber-500" },
  error: { icon: AlertCircle, bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon_color: "text-red-500" },
};

export function Alert({
  variant = "info",
  title,
  description,
  dismissible = false,
}: {
  variant?: AlertVariant;
  title: string;
  description?: string;
  dismissible?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const { icon: Icon, bg, border, text, icon_color } = config[variant];

  return (
    <div className={cn("flex gap-3 p-4 rounded-xl border", bg, border)}>
      <Icon size={18} className={cn("mt-0.5 flex-shrink-0", icon_color)} />
      <div className="flex-1 space-y-0.5">
        <p className={cn("text-sm font-semibold", text)}>{title}</p>
        {description && <p className={cn("text-sm", text, "opacity-80")}>{description}</p>}
      </div>
      {dismissible && (
        <button onClick={() => setDismissed(true)} className={cn("text-current opacity-50 hover:opacity-100", text)}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
```

---

## Dependencies Summary

```bash
# Core
npm install @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-tooltip
npm install cmdk
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# For data tables
npm install @tanstack/react-table

# shadcn/ui (installs above deps automatically)
npx shadcn@latest init
npx shadcn@latest add button input card dialog command table tooltip
```
