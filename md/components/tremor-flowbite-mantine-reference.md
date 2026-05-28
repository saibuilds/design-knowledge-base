# UI Libraries Reference — Dashboard, Forms, Tables, Email & Charts

---

# 1. Tremor (tremor.so) — Dashboard Components

## AreaChart

```tsx
import { AreaChart } from "@tremor/react";

const chartdata = [
  { date: "Jan 23", Sales: 2890, Profit: 2338 },
  { date: "Feb 23", Sales: 2756, Profit: 2103 },
  { date: "Mar 23", Sales: 3322, Profit: 2194 },
  { date: "Apr 23", Sales: 3470, Profit: 2108 },
  { date: "May 23", Sales: 3475, Profit: 1812 },
  { date: "Jun 23", Sales: 3129, Profit: 1726 },
];

export default function SalesAreaChart() {
  return (
    <AreaChart
      className="h-72 mt-4"
      data={chartdata}
      index="date"
      categories={["Sales", "Profit"]}
      colors={["indigo", "cyan"]}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      yAxisWidth={65}
      showLegend={true}
      showGridLines={true}
      showAnimation={true}
    />
  );
}
```

## BarChart

```tsx
import { BarChart } from "@tremor/react";

const data = [
  { name: "Product A", Revenue: 4000, Cost: 2400 },
  { name: "Product B", Revenue: 3000, Cost: 1398 },
  { name: "Product C", Revenue: 2000, Cost: 9800 },
  { name: "Product D", Revenue: 2780, Cost: 3908 },
  { name: "Product E", Revenue: 1890, Cost: 4800 },
];

export default function RevenueBarChart() {
  return (
    <BarChart
      className="h-72 mt-4"
      data={data}
      index="name"
      categories={["Revenue", "Cost"]}
      colors={["violet", "fuchsia"]}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      yAxisWidth={48}
      stack={false}
      layout="horizontal"
    />
  );
}
```

## DonutChart

```tsx
import { DonutChart, Legend } from "@tremor/react";

const sales = [
  { name: "Direct", value: 9800 },
  { name: "Organic", value: 4567 },
  { name: "Referral", value: 3908 },
  { name: "Social", value: 2400 },
  { name: "Email", value: 1908 },
];

export default function TrafficDonut() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <DonutChart
        className="h-52"
        data={sales}
        category="value"
        index="name"
        valueFormatter={(value) => `$${value.toLocaleString()}`}
        colors={["slate", "violet", "indigo", "rose", "cyan"]}
        showAnimation={true}
        showTooltip={true}
      />
      <Legend
        categories={sales.map((s) => s.name)}
        colors={["slate", "violet", "indigo", "rose", "cyan"]}
      />
    </div>
  );
}
```

## LineChart

```tsx
import { LineChart } from "@tremor/react";

const performance = [
  { month: "Jan", "This Year": 88, "Last Year": 70 },
  { month: "Feb", "This Year": 91, "Last Year": 72 },
  { month: "Mar", "This Year": 85, "Last Year": 68 },
  { month: "Apr", "This Year": 94, "Last Year": 80 },
  { month: "May", "This Year": 97, "Last Year": 85 },
  { month: "Jun", "This Year": 102, "Last Year": 88 },
];

export default function PerformanceLine() {
  return (
    <LineChart
      className="h-72 mt-4"
      data={performance}
      index="month"
      categories={["This Year", "Last Year"]}
      colors={["emerald", "gray"]}
      valueFormatter={(value) => `${value}%`}
      yAxisWidth={40}
      showDots={true}
      showAnimation={true}
      connectNulls={true}
    />
  );
}
```

## KPI Card with Trend

```tsx
import { Card, Metric, Text, Flex, BadgeDelta, ProgressBar } from "@tremor/react";

type KPICardProps = {
  title: string;
  metric: string;
  delta: string;
  deltaType: "increase" | "decrease" | "moderateIncrease" | "moderateDecrease";
  progress: number;
  target: string;
};

function KPICard({ title, metric, delta, deltaType, progress, target }: KPICardProps) {
  return (
    <Card className="max-w-sm">
      <Flex alignItems="start">
        <div className="truncate">
          <Text>{title}</Text>
          <Metric className="truncate">{metric}</Metric>
        </div>
        <BadgeDelta deltaType={deltaType}>{delta}</BadgeDelta>
      </Flex>
      <Flex className="mt-4 space-x-2">
        <Text className="truncate">Target: {target}</Text>
        <Text>{progress}%</Text>
      </Flex>
      <ProgressBar value={progress} className="mt-2" />
    </Card>
  );
}

export default function KPIDashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <KPICard
        title="Total Revenue"
        metric="$48,352"
        delta="+12.3%"
        deltaType="increase"
        progress={68}
        target="$71,000"
      />
      <KPICard
        title="Active Users"
        metric="2,841"
        delta="-3.1%"
        deltaType="moderateDecrease"
        progress={47}
        target="6,000"
      />
      <KPICard
        title="Conversion Rate"
        metric="5.4%"
        delta="+0.8%"
        deltaType="moderateIncrease"
        progress={82}
        target="6.6%"
      />
    </div>
  );
}
```

## Data Table with Sorting

```tsx
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Card,
  Title,
} from "@tremor/react";
import { useState } from "react";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
};

const orders: Order[] = [
  { id: "ORD-001", customer: "Alice Johnson", amount: 340, status: "completed", date: "2024-01-12" },
  { id: "ORD-002", customer: "Bob Smith", amount: 120, status: "pending", date: "2024-01-13" },
  { id: "ORD-003", customer: "Carol White", amount: 875, status: "completed", date: "2024-01-14" },
  { id: "ORD-004", customer: "Dan Brown", amount: 55, status: "cancelled", date: "2024-01-15" },
];

const statusColor: Record<Order["status"], "emerald" | "yellow" | "red"> = {
  completed: "emerald",
  pending: "yellow",
  cancelled: "red",
};

export default function OrdersTable() {
  const [sortField, setSortField] = useState<keyof Order>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...orders].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Order) => {
    if (field === sortField) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  return (
    <Card>
      <Title>Recent Orders</Title>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            {(["id", "customer", "amount", "status", "date"] as (keyof Order)[]).map((col) => (
              <TableHeaderCell
                key={col}
                className="cursor-pointer hover:text-tremor-content-emphasis"
                onClick={() => handleSort(col)}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
                {sortField === col ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge color={statusColor[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

# 2. Flowbite React — Bootstrap-Quality Components

## Navbar

```tsx
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function AppNavbar() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/">
        <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Acme Corp
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>Home</NavbarLink>
        <NavbarLink href="/dashboard">Dashboard</NavbarLink>
        <NavbarLink href="/pricing">Pricing</NavbarLink>
        <NavbarLink href="/docs">Docs</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
```

## Card

```tsx
import { Card, Button } from "flowbite-react";

export default function ProductCard() {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Product image"
      imgSrc="https://via.placeholder.com/400x200"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Premium Analytics Plan
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Unlock advanced reporting, unlimited seats, and priority support.
        Cancel anytime.
      </p>
      <Button>
        Get started
        <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
```

## Modal

```tsx
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

export default function ConfirmModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Delete account</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                Yes, delete it
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
```

## Datepicker

```tsx
import { Datepicker, Label } from "flowbite-react";

export default function BookingDatepicker() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="booking-date">Select booking date</Label>
      <Datepicker
        id="booking-date"
        minDate={new Date()}
        weekStart={1}
        showClearButton
        showTodayButton
        onSelectedDateChanged={(date) => console.log("Selected:", date)}
      />
    </div>
  );
}
```

## FileInput

```tsx
import { FileInput, Label, HelperText } from "flowbite-react";

export default function AvatarUpload() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor="avatar">Upload avatar</Label>
      <FileInput
        id="avatar"
        helperText="PNG, JPG or GIF (max 2MB)"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) console.log("File selected:", file.name);
        }}
      />
    </div>
  );
}
```

## Timeline

```tsx
import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";

export default function OrderTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime>January 12, 2024</TimelineTime>
          <TimelineTitle>Order placed</TimelineTitle>
          <TimelineBody>Your order #ORD-4821 has been received.</TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime>January 14, 2024</TimelineTime>
          <TimelineTitle>Processing</TimelineTitle>
          <TimelineBody>Items packed and ready for dispatch.</TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime>January 16, 2024</TimelineTime>
          <TimelineTitle>Shipped</TimelineTitle>
          <TimelineBody>In transit via FedEx — tracking: 794628134910.</TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Accordion

```tsx
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

export default function FAQAccordion() {
  return (
    <Accordion>
      <AccordionPanel>
        <AccordionTitle>What is included in the free plan?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            The free plan includes up to 3 projects, 5GB storage, and community support.
            No credit card required.
          </p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel>
        <AccordionTitle>Can I upgrade at any time?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            Yes. You can upgrade or downgrade your plan at any time from your account settings.
          </p>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel>
        <AccordionTitle>Do you offer refunds?</AccordionTitle>
        <AccordionContent>
          <p className="text-gray-500 dark:text-gray-400">
            We offer a 30-day money-back guarantee on all paid plans, no questions asked.
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
}
```

## Table

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from "flowbite-react";

export default function UsersTable() {
  const users = [
    { name: "Neil Sims", email: "neil@example.com", role: "Admin", status: "Active" },
    { name: "Bonnie Green", email: "bonnie@example.com", role: "Editor", status: "Active" },
    { name: "Jese Leos", email: "jese@example.com", role: "Viewer", status: "Inactive" },
  ];

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow key={user.email} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge color={user.status === "Active" ? "success" : "gray"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500 mr-4">
                  Edit
                </a>
                <a href="#" className="text-red-600 hover:underline dark:text-red-500">
                  Delete
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## Alert, Badge, Spinner

```tsx
import { Alert, Badge, Spinner } from "flowbite-react";

export default function UIElements() {
  return (
    <div className="flex flex-col gap-4">
      {/* Alerts */}
      <Alert color="info" withBorderAccent>
        <span className="font-medium">Info!</span> Your subscription renews in 7 days.
      </Alert>
      <Alert color="success" withBorderAccent onDismiss={() => {}}>
        <span className="font-medium">Success!</span> Your profile has been updated.
      </Alert>
      <Alert color="warning" withBorderAccent>
        <span className="font-medium">Warning!</span> API rate limit at 80%.
      </Alert>
      <Alert color="failure" withBorderAccent>
        <span className="font-medium">Error!</span> Payment method declined.
      </Alert>

      {/* Badges */}
      <div className="flex gap-2">
        <Badge color="info">Info</Badge>
        <Badge color="success">Active</Badge>
        <Badge color="warning" size="sm">Beta</Badge>
        <Badge color="failure">Offline</Badge>
        <Badge color="purple">Premium</Badge>
      </div>

      {/* Spinners */}
      <div className="flex gap-4 items-center">
        <Spinner size="sm" />
        <Spinner size="md" color="success" />
        <Spinner size="lg" color="purple" />
        <Spinner size="xl" color="pink" />
      </div>
    </div>
  );
}
```

---

# 3. DaisyUI — HTML Class-Based Tailwind Components

## Navbar

```html
<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
        </svg>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Contact</a></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl">Acme</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>About</a></li>
      <li><a>Contact</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <a class="btn btn-primary">Sign up</a>
  </div>
</div>
```

## Hero

```html
<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Build faster.</h1>
      <p class="py-6 text-base-content/70">
        Ship beautiful interfaces without leaving your HTML.
        DaisyUI gives you semantic class names on top of Tailwind.
      </p>
      <div class="flex gap-3 justify-center">
        <button class="btn btn-primary">Get Started</button>
        <button class="btn btn-ghost">Learn more</button>
      </div>
    </div>
  </div>
</div>
```

## Card

```html
<div class="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img src="https://via.placeholder.com/400x200" alt="Card image" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      Mountains at Dusk
      <div class="badge badge-secondary">New</div>
    </h2>
    <p>A breathtaking photograph taken at golden hour in the Swiss Alps.</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">Photography</div>
      <div class="badge badge-outline">Nature</div>
    </div>
    <div class="card-actions mt-4 justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
```

## Badge

```html
<div class="flex flex-wrap gap-2">
  <div class="badge">Default</div>
  <div class="badge badge-primary">Primary</div>
  <div class="badge badge-secondary">Secondary</div>
  <div class="badge badge-accent">Accent</div>
  <div class="badge badge-ghost">Ghost</div>
  <div class="badge badge-info gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-4 w-4 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
    Info
  </div>
  <div class="badge badge-success badge-lg">Large Success</div>
  <div class="badge badge-warning badge-sm">Small Warn</div>
  <div class="badge badge-error badge-xs">XS Error</div>
</div>
```

## Drawer

```html
<div class="drawer lg:drawer-open">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    <!-- Page content -->
    <label for="my-drawer" class="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
    <main class="p-8">
      <h1 class="text-2xl font-bold">Main content area</h1>
      <p class="mt-2 text-base-content/70">Sidebar slides in on mobile, always visible on desktop.</p>
    </main>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-64 p-4">
      <li class="menu-title">Navigation</li>
      <li><a class="active">Dashboard</a></li>
      <li><a>Analytics</a></li>
      <li><a>Reports</a></li>
      <li class="menu-title mt-4">Settings</li>
      <li><a>Profile</a></li>
      <li><a>Billing</a></li>
    </ul>
  </div>
</div>
```

## Modal

```html
<!-- Trigger -->
<button class="btn btn-primary" onclick="confirm_modal.showModal()">Open modal</button>

<!-- Modal (dialog element) -->
<dialog id="confirm_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Confirm deletion</h3>
    <p class="py-4">This action cannot be undone. All data will be permanently removed.</p>
    <div class="modal-action">
      <form method="dialog" class="flex gap-2">
        <button class="btn btn-error">Delete</button>
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

## Carousel

```html
<div class="carousel w-full rounded-xl overflow-hidden">
  <div id="slide1" class="carousel-item relative w-full">
    <img src="https://via.placeholder.com/800x400/6366f1/ffffff?text=Slide+1" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" class="btn btn-circle">❮</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" class="carousel-item relative w-full">
    <img src="https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Slide+2" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" class="btn btn-circle">❮</a>
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" class="carousel-item relative w-full">
    <img src="https://via.placeholder.com/800x400/06b6d4/ffffff?text=Slide+3" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" class="btn btn-circle">❮</a>
      <a href="#slide4" class="btn btn-circle">❯</a>
    </div>
  </div>
</div>
```

## Timeline

```html
<ul class="timeline timeline-vertical">
  <li>
    <div class="timeline-start timeline-box">Application submitted</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-primary h-5 w-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
      </svg>
    </div>
    <hr class="bg-primary"/>
  </li>
  <li>
    <hr class="bg-primary"/>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-primary h-5 w-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="timeline-end timeline-box">Under review</div>
    <hr/>
  </li>
  <li>
    <hr/>
    <div class="timeline-start timeline-box">Interview scheduled</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
      </svg>
    </div>
  </li>
</ul>
```

## Steps

```html
<ul class="steps w-full">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Verify email</li>
  <li class="step">Complete profile</li>
  <li class="step">Subscribe</li>
</ul>

<!-- Vertical steps -->
<ul class="steps steps-vertical">
  <li class="step step-primary">Choose plan</li>
  <li class="step step-primary">Add payment</li>
  <li class="step">Confirm</li>
</ul>
```

## Chat Bubble

```html
<div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img alt="Avatar" src="https://via.placeholder.com/40/6366f1/ffffff?text=A" />
    </div>
  </div>
  <div class="chat-header">
    Alice
    <time class="text-xs opacity-50 ml-1">12:45</time>
  </div>
  <div class="chat-bubble">Hey! Did you see the new dashboard?</div>
  <div class="chat-footer opacity-50 text-xs">Delivered</div>
</div>

<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img alt="Avatar" src="https://via.placeholder.com/40/06b6d4/ffffff?text=B" />
    </div>
  </div>
  <div class="chat-header">
    You
    <time class="text-xs opacity-50 ml-1">12:46</time>
  </div>
  <div class="chat-bubble chat-bubble-primary">Yes! The charts look amazing.</div>
  <div class="chat-footer opacity-50 text-xs">Seen</div>
</div>
```

## Countdown

```html
<div class="flex gap-4">
  <div class="flex flex-col items-center">
    <span class="countdown font-mono text-5xl">
      <span style="--value:02;"></span>
    </span>
    days
  </div>
  <div class="flex flex-col items-center">
    <span class="countdown font-mono text-5xl">
      <span style="--value:14;"></span>
    </span>
    hours
  </div>
  <div class="flex flex-col items-center">
    <span class="countdown font-mono text-5xl">
      <span style="--value:32;"></span>
    </span>
    min
  </div>
  <div class="flex flex-col items-center">
    <span class="countdown font-mono text-5xl">
      <span style="--value:08;"></span>
    </span>
    sec
  </div>
</div>
```

## Rating

```html
<!-- Static star rating -->
<div class="rating">
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
</div>

<!-- Half-star rating -->
<div class="rating rating-half rating-lg">
  <input type="radio" name="rating-half" class="rating-hidden" />
  <input type="radio" name="rating-half" class="mask mask-star-2 mask-half-1 bg-green-500" />
  <input type="radio" name="rating-half" class="mask mask-star-2 mask-half-2 bg-green-500" />
  <input type="radio" name="rating-half" class="mask mask-star-2 mask-half-1 bg-green-500" checked />
  <input type="radio" name="rating-half" class="mask mask-star-2 mask-half-2 bg-green-500" />
</div>
```

## Stat

```html
<div class="stats shadow w-full">
  <div class="stat">
    <div class="stat-figure text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-8 w-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </div>
    <div class="stat-title">Total Revenue</div>
    <div class="stat-value text-primary">$89,400</div>
    <div class="stat-desc">↗︎ 400 (22%) vs last month</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-8 w-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    </div>
    <div class="stat-title">New Users</div>
    <div class="stat-value text-secondary">4,200</div>
    <div class="stat-desc">↘︎ 90 (14%) vs last month</div>
  </div>
  <div class="stat">
    <div class="stat-figure text-secondary">
      <div class="avatar online">
        <div class="w-16 rounded-full">
          <img src="https://via.placeholder.com/64" />
        </div>
      </div>
    </div>
    <div class="stat-value">86%</div>
    <div class="stat-title">Tasks done</div>
    <div class="stat-desc text-secondary">31 tasks remaining</div>
  </div>
</div>
```

---

# 4. Mantine — Full-Featured React Component Library

## AppShell Layout

```tsx
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellFooter,
  Burger,
  Group,
  NavLink,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconChartBar, IconSettings, IconSun, IconMoon } from "@tabler/icons-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const links = [
    { href: "/", label: "Dashboard", icon: IconHome },
    { href: "/analytics", label: "Analytics", icon: IconChartBar },
    { href: "/settings", label: "Settings", icon: IconSettings },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      footer={{ height: 40 }}
      padding="md"
    >
      <AppShellHeader>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg">Acme Dashboard</Text>
          </Group>
          <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
            {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </AppShellHeader>

      <AppShellNavbar p="md">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            leftSection={<link.icon size={16} />}
          />
        ))}
      </AppShellNavbar>

      <AppShellMain>{children}</AppShellMain>

      <AppShellFooter p="xs">
        <Text size="xs" c="dimmed" ta="center">© 2024 Acme Corp</Text>
      </AppShellFooter>
    </AppShell>
  );
}
```

## DateTimePicker

```tsx
import { DateTimePicker, DatePickerInput } from "@mantine/dates";
import { Stack } from "@mantine/core";
import { useState } from "react";

export default function DateTimeExample() {
  const [datetime, setDatetime] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Stack gap="md" maw={400}>
      <DateTimePicker
        label="Schedule event"
        placeholder="Pick date and time"
        value={datetime}
        onChange={setDatetime}
        clearable
        valueFormat="DD MMM YYYY HH:mm"
        minDate={new Date()}
      />

      <DatePickerInput
        type="range"
        label="Date range"
        placeholder="Pick dates range"
        value={range}
        onChange={setRange}
        clearable
      />
    </Stack>
  );
}
```

## RichTextEditor

```tsx
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const initialContent = "<p>Start writing your content here...</p>";

export default function RichEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
          <RichTextEditor.AlignJustify />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content mih={200} />
    </RichTextEditor>
  );
}
```

## MultiSelect

```tsx
import { MultiSelect, Select, Stack } from "@mantine/core";
import { useState } from "react";

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const skills = ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Docker"];

export default function SelectExamples() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React"]);
  const [country, setCountry] = useState<string | null>(null);

  return (
    <Stack gap="md" maw={400}>
      <MultiSelect
        label="Skills"
        placeholder="Search and select skills"
        data={skills}
        value={selectedSkills}
        onChange={setSelectedSkills}
        searchable
        clearable
        maxValues={5}
        description="Maximum 5 skills"
      />

      <Select
        label="Country"
        placeholder="Select a country"
        data={countries}
        value={country}
        onChange={setCountry}
        searchable
        clearable
        nothingFoundMessage="No country found"
      />
    </Stack>
  );
}
```

## FileInput

```tsx
import { FileInput, FileButton, Button, Text, Stack, Group } from "@mantine/core";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { useState } from "react";

export default function FileUploadExample() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Stack gap="md" maw={400}>
      <FileInput
        label="Upload document"
        placeholder="Click to select file"
        leftSection={<IconUpload size={14} />}
        accept=".pdf,.doc,.docx"
        value={file}
        onChange={setFile}
        clearable
      />

      <div>
        <FileButton onChange={setFiles} accept="image/*" multiple>
          {(props) => (
            <Button {...props} leftSection={<IconPhoto size={14} />} variant="light">
              Upload images
            </Button>
          )}
        </FileButton>
        {files.length > 0 && (
          <Text size="sm" mt="sm" c="dimmed">
            {files.length} file(s) selected: {files.map((f) => f.name).join(", ")}
          </Text>
        )}
      </div>
    </Stack>
  );
}
```

## Notifications

```tsx
// main.tsx — wrap app with MantineProvider + Notifications
import { MantineProvider } from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" zIndex={9999} />
      {/* rest of app */}
    </MantineProvider>
  );
}

// Usage anywhere in the app
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

function NotificationExamples() {
  const showSuccess = () =>
    notifications.show({
      title: "Profile saved",
      message: "Your changes have been saved successfully.",
      color: "green",
      icon: <IconCheck size={18} />,
      autoClose: 4000,
    });

  const showError = () =>
    notifications.show({
      title: "Upload failed",
      message: "File size exceeds the 5MB limit.",
      color: "red",
      icon: <IconX size={18} />,
      autoClose: false,
    });

  const showLoading = () => {
    const id = notifications.show({
      loading: true,
      title: "Uploading file",
      message: "Please wait...",
      autoClose: false,
      withCloseButton: false,
    });

    setTimeout(() =>
      notifications.update({
        id,
        loading: false,
        title: "Upload complete",
        message: "Your file has been uploaded.",
        icon: <IconCheck size={18} />,
        color: "green",
        autoClose: 3000,
      }), 3000);
  };

  return (
    <Group>
      <button onClick={showSuccess}>Success</button>
      <button onClick={showError}>Error</button>
      <button onClick={showLoading}>With loading</button>
    </Group>
  );
}
```

## Spotlight (Command Palette)

```tsx
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { ActionIcon, Button } from "@mantine/core";
import { IconSearch, IconHome, IconChartBar, IconSettings, IconUser } from "@tabler/icons-react";

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Dashboard",
    description: "Go to main dashboard",
    onClick: () => console.log("Dashboard"),
    leftSection: <IconHome size={18} stroke={1.5} />,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "View analytics reports",
    onClick: () => console.log("Analytics"),
    leftSection: <IconChartBar size={18} stroke={1.5} />,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Manage your account settings",
    onClick: () => console.log("Settings"),
    leftSection: <IconSettings size={18} stroke={1.5} />,
  },
  {
    id: "profile",
    label: "Profile",
    description: "Edit your profile",
    onClick: () => console.log("Profile"),
    leftSection: <IconUser size={18} stroke={1.5} />,
  },
];

export default function CommandPalette() {
  return (
    <>
      <Button onClick={spotlight.open} leftSection={<IconSearch size={16} />} variant="subtle">
        Search... (Ctrl+K)
      </Button>

      <Spotlight
        actions={actions}
        searchProps={{ placeholder: "Search commands..." }}
        shortcut="mod+K"
        highlightQuery
        scrollable
        maxHeight={350}
        nothingFound="No results found."
      />
    </>
  );
}
```

## Charts (@mantine/charts)

```tsx
import { AreaChart, BarChart, DonutChart, LineChart } from "@mantine/charts";
import { Stack } from "@mantine/core";

const data = [
  { date: "Mar 22", Apples: 2890, Oranges: 2338, Tomatoes: 2452 },
  { date: "Mar 23", Apples: 2756, Oranges: 2103, Tomatoes: 2402 },
  { date: "Mar 24", Apples: 3322, Oranges: 986, Tomatoes: 1821 },
  { date: "Mar 25", Apples: 3470, Oranges: 2108, Tomatoes: 2809 },
  { date: "Mar 26", Apples: 3129, Oranges: 1726, Tomatoes: 2290 },
];

export default function MantineCharts() {
  return (
    <Stack gap="xl">
      <AreaChart
        h={260}
        data={data}
        dataKey="date"
        series={[
          { name: "Apples", color: "indigo.6" },
          { name: "Oranges", color: "blue.6" },
          { name: "Tomatoes", color: "teal.6" },
        ]}
        curveType="natural"
        withLegend
      />

      <BarChart
        h={260}
        data={data}
        dataKey="date"
        series={[
          { name: "Apples", color: "violet.6" },
          { name: "Oranges", color: "grape.6" },
        ]}
        withLegend
      />

      <DonutChart
        data={[
          { name: "USA", value: 400, color: "indigo.6" },
          { name: "India", value: 300, color: "yellow.6" },
          { name: "Japan", value: 100, color: "teal.6" },
          { name: "Other", value: 200, color: "gray.6" },
        ]}
        h={200}
        withTooltip
      />
    </Stack>
  );
}
```

---

# 5. React Email — Beautiful Email Templates

## Welcome Email

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  username: string;
  loginUrl: string;
}

export default function WelcomeEmail({ username = "there", loginUrl = "https://app.example.com" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Acme — your account is ready</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://via.placeholder.com/120x40/6366f1/ffffff?text=Acme"
            width={120}
            height={40}
            alt="Acme"
            style={logo}
          />
          <Heading style={h1}>Welcome, {username}!</Heading>
          <Text style={paragraph}>
            Your account has been created and is ready to use. Click the button
            below to sign in for the first time.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={loginUrl}>
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            If you have any questions, reply to this email or visit our{" "}
            <Link href="https://docs.example.com" style={link}>help centre</Link>.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Acme Corp, 123 Market Street, San Francisco CA 94105
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px", borderRadius: "8px", maxWidth: "580px" };
const logo = { margin: "0 auto 24px", display: "block" };
const h1 = { color: "#1a1a1a", fontSize: "28px", fontWeight: "700", margin: "30px 0", padding: "0 48px" };
const paragraph = { color: "#444", fontSize: "16px", lineHeight: "26px", margin: "0 0 16px", padding: "0 48px" };
const btnContainer = { textAlign: "center" as const, padding: "8px 0 24px" };
const button = { backgroundColor: "#6366f1", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "600", textDecoration: "none", textAlign: "center" as const, display: "block", padding: "12px 24px", margin: "0 auto", width: "200px" };
const link = { color: "#6366f1" };
const hr = { borderColor: "#e6ebf1", margin: "24px 48px" };
const footer = { color: "#9ca3af", fontSize: "12px", padding: "0 48px" };
```

## Transactional / Receipt Email

```tsx
import {
  Body, Column, Container, Head, Heading, Hr, Html,
  Img, Preview, Row, Section, Text,
} from "@react-email/components";

interface LineItem {
  name: string;
  qty: number;
  price: number;
}

interface ReceiptEmailProps {
  orderNumber: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerName: string;
}

export default function ReceiptEmail({
  orderNumber = "ORD-4821",
  items = [
    { name: "Pro Plan (monthly)", qty: 1, price: 49 },
    { name: "Extra seats (x3)", qty: 3, price: 9 },
  ],
  subtotal = 76,
  tax = 6.08,
  total = 82.08,
  customerName = "Alice Johnson",
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your receipt for order {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Receipt</Heading>
          <Text style={meta}>Order {orderNumber} · {new Date().toLocaleDateString()}</Text>
          <Text style={paragraph}>Hi {customerName}, thank you for your purchase.</Text>

          <Section style={tableSection}>
            <Row style={tableHeader}>
              <Column style={colItem}>Item</Column>
              <Column style={colQty}>Qty</Column>
              <Column style={colPrice}>Price</Column>
            </Row>
            {items.map((item, i) => (
              <Row key={i} style={tableRow}>
                <Column style={colItem}>{item.name}</Column>
                <Column style={colQty}>{item.qty}</Column>
                <Column style={colPrice}>${(item.qty * item.price).toFixed(2)}</Column>
              </Row>
            ))}
            <Hr style={hr} />
            <Row style={tableRow}>
              <Column style={colItem}>Subtotal</Column>
              <Column style={colQty} />
              <Column style={colPrice}>${subtotal.toFixed(2)}</Column>
            </Row>
            <Row style={tableRow}>
              <Column style={colItem}>Tax (8%)</Column>
              <Column style={colQty} />
              <Column style={colPrice}>${tax.toFixed(2)}</Column>
            </Row>
            <Row style={{ ...tableRow, fontWeight: "700" }}>
              <Column style={colItem}>Total</Column>
              <Column style={colQty} />
              <Column style={colPrice}>${total.toFixed(2)}</Column>
            </Row>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Questions? Email billing@example.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { backgroundColor: "#fff", maxWidth: "580px", margin: "0 auto", padding: "32px 48px", borderRadius: "8px" };
const h1 = { fontSize: "32px", fontWeight: "700", margin: "0 0 4px" };
const meta = { color: "#6b7280", fontSize: "14px", margin: "0 0 24px" };
const paragraph = { fontSize: "15px", color: "#374151", lineHeight: "24px" };
const tableSection = { marginTop: "24px" };
const tableHeader = { borderBottom: "2px solid #e5e7eb", paddingBottom: "8px", fontWeight: "700", fontSize: "13px", color: "#6b7280", textTransform: "uppercase" as const };
const tableRow = { fontSize: "15px", color: "#374151", paddingTop: "10px", paddingBottom: "10px" };
const colItem = { width: "60%" };
const colQty = { width: "15%", textAlign: "center" as const };
const colPrice = { width: "25%", textAlign: "right" as const };
const hr = { borderColor: "#e5e7eb", margin: "16px 0" };
const footer = { fontSize: "12px", color: "#9ca3af", marginTop: "16px" };
```

## Newsletter Email

```tsx
import {
  Body, Button, Container, Head, Heading, Hr,
  Html, Img, Preview, Section, Text, Link, Row, Column,
} from "@react-email/components";

interface Article {
  title: string;
  excerpt: string;
  url: string;
  image: string;
}

interface NewsletterEmailProps {
  issueNumber: number;
  articles: Article[];
  unsubscribeUrl: string;
}

export default function NewsletterEmail({
  issueNumber = 42,
  articles = [
    { title: "The future of UI components", excerpt: "How AI is changing the way we build interfaces in 2024.", url: "#", image: "https://via.placeholder.com/560x280/6366f1/ffffff?text=Article+1" },
    { title: "TanStack Table v8 deep dive", excerpt: "Everything you need to know about headless tables.", url: "#", image: "https://via.placeholder.com/560x280/8b5cf6/ffffff?text=Article+2" },
  ],
  unsubscribeUrl = "#",
}: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Issue #{issueNumber} — The best in web design this week</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={issueLabel}>Issue #{issueNumber}</Text>
            <Heading style={h1}>This Week in Design</Heading>
            <Text style={subtitle}>The best articles, tools, and resources for web developers</Text>
          </Section>

          <Hr style={hr} />

          {articles.map((article, i) => (
            <Section key={i} style={articleSection}>
              <Img src={article.image} width={560} alt={article.title} style={articleImage} />
              <Heading as="h2" style={h2}>{article.title}</Heading>
              <Text style={excerpt}>{article.excerpt}</Text>
              <Button style={readMoreBtn} href={article.url}>Read article →</Button>
              {i < articles.length - 1 && <Hr style={hr} />}
            </Section>
          ))}

          <Hr style={hr} />

          <Section style={footerSection}>
            <Text style={footer}>
              You received this because you subscribed at example.com.{" "}
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f1f5f9", fontFamily: "sans-serif" };
const container = { backgroundColor: "#fff", maxWidth: "600px", margin: "0 auto", borderRadius: "12px", overflow: "hidden" };
const header = { backgroundColor: "#6366f1", padding: "32px 48px" };
const issueLabel = { color: "#c7d2fe", fontSize: "13px", fontWeight: "600", textTransform: "uppercase" as const, margin: "0" };
const h1 = { color: "#fff", fontSize: "32px", fontWeight: "800", margin: "8px 0" };
const subtitle = { color: "#e0e7ff", fontSize: "15px", margin: "0" };
const articleSection = { padding: "32px 48px 0" };
const articleImage = { borderRadius: "8px", maxWidth: "100%" };
const h2 = { fontSize: "22px", fontWeight: "700", color: "#1e293b", margin: "16px 0 8px" };
const excerpt = { fontSize: "15px", lineHeight: "24px", color: "#475569", margin: "0 0 16px" };
const readMoreBtn = { color: "#6366f1", fontSize: "15px", fontWeight: "600", textDecoration: "none", display: "inline-block", marginBottom: "16px" };
const hr = { borderColor: "#e2e8f0", margin: "0 48px" };
const footerSection = { padding: "24px 48px" };
const footer = { fontSize: "12px", color: "#94a3b8", textAlign: "center" as const };
const unsubLink = { color: "#6366f1" };
```

---

# 6. Recharts — Data Visualization

## LineChart with Custom Tooltip

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 5000, expenses: 3000, profit: 2000 },
  { month: "Apr", revenue: 4780, expenses: 3908, profit: 872 },
  { month: "May", revenue: 5890, expenses: 4000, profit: 1890 },
  { month: "Jun", revenue: 6390, expenses: 3800, profit: 2590 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }} className="text-sm">
          {entry.name}: <span className="font-medium">${entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export default function RevenueLineChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## BarChart — Stacked

```tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { quarter: "Q1", Desktop: 4000, Mobile: 2400, Tablet: 800 },
  { quarter: "Q2", Desktop: 3000, Mobile: 1398, Tablet: 1200 },
  { quarter: "Q3", Desktop: 2000, Mobile: 5800, Tablet: 1500 },
  { quarter: "Q4", Desktop: 2780, Mobile: 3908, Tablet: 900 },
];

export default function TrafficBarChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
          <Bar dataKey="Desktop" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Mobile" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="Tablet" stackId="a" fill="#a78bfa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## PieChart with Custom Label

```tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Direct", value: 4200 },
  { name: "Organic", value: 3100 },
  { name: "Referral", value: 1800 },
  { name: "Social", value: 900 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TrafficPieChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={130}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## AreaChart — Gradient Fill

```tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
} from "recharts";

const data = [
  { time: "00:00", users: 120 },
  { time: "04:00", users: 60 },
  { time: "08:00", users: 980 },
  { time: "12:00", users: 1420 },
  { time: "16:00", users: 1100 },
  { time: "20:00", users: 750 },
  { time: "23:59", users: 310 },
];

export default function ActiveUsersArea() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## RadarChart

```tsx
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { skill: "React", candidate: 90, average: 70 },
  { skill: "TypeScript", candidate: 85, average: 65 },
  { skill: "Node.js", candidate: 70, average: 75 },
  { skill: "CSS", candidate: 95, average: 80 },
  { skill: "Testing", candidate: 60, average: 70 },
  { skill: "DevOps", candidate: 50, average: 55 },
];

export default function SkillsRadar() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar name="Candidate" dataKey="candidate" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
          <Radar name="Average" dataKey="average" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

# 7. TanStack Table v8 — Advanced Data Tables

## Full Featured Table (Sort, Filter, Pagination, Row Selection, Virtualized)

```tsx
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useState, useRef, useMemo } from "react";

// --- Types ---
type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  joined: string;
  revenue: number;
};

// --- Generate mock data ---
function generateUsers(count: number): User[] {
  const roles: User["role"][] = ["admin", "editor", "viewer"];
  const statuses: User["status"][] = ["active", "inactive"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % 3],
    status: statuses[i % 2],
    joined: new Date(2022, i % 12, (i % 28) + 1).toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 50000),
  }));
}

// --- Global filter input ---
function GlobalFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Search all columns..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// --- Main component ---
export default function UsersDataTable() {
  const data = useMemo(() => generateUsers(500), []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      // Checkbox column
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) el.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded border-gray-300"
          />
        ),
        size: 40,
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: "#",
        size: 60,
        cell: ({ getValue }) => <span className="text-gray-400 text-sm">#{getValue<number>()}</span>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 font-semibold hover:text-indigo-600"
          >
            Name
            {column.getIsSorted() === "asc" ? " ↑" : column.getIsSorted() === "desc" ? " ↓" : " ↕"}
          </button>
        ),
        filterFn: "includesString",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <span className="text-indigo-600 text-sm">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 font-semibold hover:text-indigo-600"
          >
            Role {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </button>
        ),
        cell: ({ getValue }) => {
          const role = getValue<string>();
          const colors: Record<string, string> = {
            admin: "bg-purple-100 text-purple-700",
            editor: "bg-blue-100 text-blue-700",
            viewer: "bg-gray-100 text-gray-700",
          };
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role]}`}>
              {role}
            </span>
          );
        },
        filterFn: "equals",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const active = getValue<string>() === "active";
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {getValue<string>()}
            </span>
          );
        },
      },
      {
        accessorKey: "revenue",
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 font-semibold hover:text-indigo-600"
          >
            Revenue {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : "↕"}
          </button>
        ),
        cell: ({ getValue }) => `$${getValue<number>().toLocaleString()}`,
      },
      {
        accessorKey: "joined",
        header: "Joined",
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <GlobalFilter value={globalFilter} onChange={setGlobalFilter} />
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="text-sm text-indigo-600 font-medium">
              {selectedCount} selected
            </span>
          )}
          <select
            className="border border-gray-300 rounded-md px-2 py-2 text-sm"
            value={table.getColumn("role")?.getFilterValue() as string ?? ""}
            onChange={(e) =>
              table.getColumn("role")?.setFilterValue(e.target.value || undefined)
            }
          >
            <option value="">All roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 transition-colors ${row.getIsSelected() ? "bg-indigo-50" : ""}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={pagination.pageSize}
            onChange={(e) => setPagination((p) => ({ ...p, pageSize: Number(e.target.value), pageIndex: 0 }))}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{size} / page</option>
            ))}
          </select>
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded text-sm disabled:opacity-40">«</button>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 border rounded text-sm disabled:opacity-40">Prev</button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 border rounded text-sm disabled:opacity-40">Next</button>
          <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded text-sm disabled:opacity-40">»</button>
        </div>
      </div>
    </div>
  );
}
```

## Virtualized Rows (large dataset)

```tsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useMemo } from "react";

type Row = { id: number; name: string; value: number };

const data: Row[] = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 1000),
}));

const columns: ColumnDef<Row>[] = [
  { accessorKey: "id", header: "ID", size: 80 },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "value", header: "Value", cell: ({ getValue }) => `$${getValue<number>()}` },
];

export default function VirtualTable() {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const rows = table.getRowModel().rows;
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - virtualRows[virtualRows.length - 1].end : 0;

  return (
    <div ref={parentRef} className="h-96 overflow-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gray-50 border-b">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} className="px-4 py-3 text-left font-semibold text-gray-600">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && <tr><td style={{ height: paddingTop }} /></tr>}
          {virtualRows.map((vr) => {
            const row = rows[vr.index];
            return (
              <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
          {paddingBottom > 0 && <tr><td style={{ height: paddingBottom }} /></tr>}
        </tbody>
      </table>
    </div>
  );
}
```

---

# 8. React Hook Form + Zod — Form Validation

## Complete Form (All Field Types)

```tsx
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- Schema ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be under 60 characters"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string(),

    country: z.string().min(1, "Please select a country"),

    role: z.enum(["developer", "designer", "manager", "other"], {
      required_error: "Please select a role",
    }),

    plan: z.enum(["free", "pro", "enterprise"]),

    birthDate: z
      .string()
      .refine((d) => !isNaN(Date.parse(d)), "Invalid date")
      .refine((d) => {
        const age = (Date.now() - Date.parse(d)) / (1000 * 60 * 60 * 24 * 365);
        return age >= 18;
      }, "You must be at least 18 years old"),

    website: z
      .string()
      .url("Please enter a valid URL (include https://)")
      .optional()
      .or(z.literal("")),

    bio: z
      .string()
      .max(500, "Bio must be under 500 characters")
      .optional(),

    notifications: z.boolean(),

    terms: z
      .boolean()
      .refine((v) => v === true, "You must accept the terms and conditions"),

    avatar: z
      .custom<FileList>()
      .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, "Max file size is 5MB")
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        "Only .jpg, .jpeg, .png and .webp files are accepted"
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

// --- Reusable field wrapper ---
function FieldWrapper({ label, error, children, required }: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-400 focus:ring-red-300 bg-red-50"
      : "border-gray-300 focus:ring-indigo-300 focus:border-indigo-400"
  }`;

// --- Form component ---
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      plan: "free",
      notifications: true,
      terms: false,
    },
  });

  const watchPassword = watch("password", "");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    console.log("Form submitted:", data);
    reset();
  };

  const passwordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(watchPassword);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Text: Full name */}
        <FieldWrapper label="Full name" error={errors.fullName?.message} required>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Alice Johnson"
            className={inputClass(!!errors.fullName)}
            autoComplete="name"
          />
        </FieldWrapper>

        {/* Email */}
        <FieldWrapper label="Email address" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            placeholder="alice@example.com"
            className={inputClass(!!errors.email)}
            autoComplete="email"
          />
        </FieldWrapper>

        {/* Password */}
        <FieldWrapper label="Password" error={errors.password?.message} required>
          <input
            {...register("password")}
            type="password"
            placeholder="Min. 8 characters"
            className={inputClass(!!errors.password)}
            autoComplete="new-password"
          />
          {watchPassword && (
            <div className="mt-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= strength ? strengthColors[strength] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">{strengthLabels[strength]}</p>
            </div>
          )}
        </FieldWrapper>

        {/* Confirm password */}
        <FieldWrapper label="Confirm password" error={errors.confirmPassword?.message} required>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Repeat your password"
            className={inputClass(!!errors.confirmPassword)}
            autoComplete="new-password"
          />
        </FieldWrapper>

        {/* Select: Country */}
        <FieldWrapper label="Country" error={errors.country?.message} required>
          <select {...register("country")} className={inputClass(!!errors.country)}>
            <option value="">Select a country...</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
          </select>
        </FieldWrapper>

        {/* Date: Birth date */}
        <FieldWrapper label="Date of birth" error={errors.birthDate?.message} required>
          <input
            {...register("birthDate")}
            type="date"
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            className={inputClass(!!errors.birthDate)}
          />
        </FieldWrapper>

        {/* Text: Website */}
        <FieldWrapper label="Website" error={errors.website?.message}>
          <input
            {...register("website")}
            type="url"
            placeholder="https://yoursite.com"
            className={inputClass(!!errors.website)}
          />
        </FieldWrapper>

        {/* File: Avatar */}
        <FieldWrapper label="Profile photo" error={errors.avatar?.message}>
          <input
            {...register("avatar")}
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </FieldWrapper>
      </div>

      {/* Radio: Role */}
      <FieldWrapper label="Your role" error={errors.role?.message} required>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["developer", "designer", "manager", "other"] as const).map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50"
            >
              <input {...register("role")} type="radio" value={r} className="text-indigo-600" />
              <span className="text-sm capitalize">{r}</span>
            </label>
          ))}
        </div>
        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
      </FieldWrapper>

      {/* Radio: Plan */}
      <FieldWrapper label="Choose plan" error={errors.plan?.message}>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: "free", label: "Free", price: "$0/mo" },
            { value: "pro", label: "Pro", price: "$12/mo" },
            { value: "enterprise", label: "Enterprise", price: "$49/mo" },
          ] as const).map((plan) => (
            <label
              key={plan.value}
              className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50"
            >
              <input {...register("plan")} type="radio" value={plan.value} className="sr-only" />
              <span className="font-semibold text-sm">{plan.label}</span>
              <span className="text-xs text-gray-500">{plan.price}</span>
            </label>
          ))}
        </div>
      </FieldWrapper>

      {/* Textarea: Bio */}
      <FieldWrapper label="Bio" error={errors.bio?.message}>
        <textarea
          {...register("bio")}
          rows={3}
          placeholder="Tell us about yourself..."
          className={`${inputClass(!!errors.bio)} resize-none`}
        />
        <p className="text-xs text-gray-400 text-right">{watch("bio")?.length ?? 0}/500</p>
      </FieldWrapper>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            {...register("notifications")}
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
          />
          <span className="text-sm text-gray-700">
            Send me product updates and announcements
          </span>
        </label>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register("terms")}
              type="checkbox"
              className={`rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 ${errors.terms ? "border-red-400" : ""}`}
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-indigo-600 underline">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && <p className="text-xs text-red-500 mt-1 ml-7">{errors.terms.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}
```

## Zod Schema Patterns Reference

```tsx
import { z } from "zod";

// String patterns
const stringExamples = z.object({
  required: z.string().min(1, "Required"),
  email: z.string().email(),
  url: z.string().url(),
  uuid: z.string().uuid(),
  regex: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),
  trim: z.string().trim().min(1),
  transform: z.string().transform((s) => s.toLowerCase()),
});

// Number patterns
const numberExamples = z.object({
  age: z.number().int().min(0).max(150),
  price: z.number().positive().multipleOf(0.01),
  rating: z.number().min(1).max(5),
});

// Optional vs nullable vs default
const optionalFields = z.object({
  optional: z.string().optional(),        // string | undefined
  nullable: z.string().nullable(),        // string | null
  withDefault: z.string().default("N/A"), // never undefined
  nullish: z.string().nullish(),          // string | null | undefined
});

// Enum and union
const enumExamples = z.object({
  status: z.enum(["active", "inactive", "pending"]),
  union: z.union([z.string(), z.number()]),
  discriminated: z.discriminatedUnion("type", [
    z.object({ type: z.literal("email"), email: z.string().email() }),
    z.object({ type: z.literal("phone"), phone: z.string() }),
  ]),
});

// Array and tuple
const collectionExamples = z.object({
  tags: z.array(z.string()).min(1).max(10),
  tuple: z.tuple([z.string(), z.number(), z.boolean()]),
  nonEmpty: z.array(z.string()).nonempty(),
});

// Refinements
const refinementExamples = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((d) => new Date(d.startDate) < new Date(d.endDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

// Async validation (e.g. check username availability)
const asyncSchema = z.object({
  username: z.string().refine(
    async (val) => {
      const res = await fetch(`/api/check-username?u=${val}`);
      const { available } = await res.json();
      return available;
    },
    { message: "Username is already taken" }
  ),
});
```
