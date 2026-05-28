# Refero SaaS UI Patterns — Full TSX Reference

> Full implementations. TypeScript interfaces. Tailwind CSS. Framer Motion where applicable.

---

## 1. Pricing Table (3-tier, monthly/annual toggle, featured highlight)

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 9,
    annualPrice: 7,
    description: "Perfect for individuals and small projects.",
    features: ["5 projects", "10 GB storage", "Basic analytics", "Email support"],
    cta: "Get started",
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 23,
    description: "For growing teams that need more power.",
    features: ["Unlimited projects", "100 GB storage", "Advanced analytics", "Priority support", "Custom domains", "Team collaboration"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "For large organizations with custom needs.",
    features: ["Everything in Pro", "1 TB storage", "SSO / SAML", "Dedicated support", "SLA guarantee", "Custom contracts"],
    cta: "Contact sales",
  },
];

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-gray-500 mb-8">No hidden fees. Cancel anytime.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                annual ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs text-emerald-600 font-semibold">–20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              layout
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.featured
                  ? "bg-gray-900 border-gray-900 text-white shadow-2xl scale-105"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${plan.featured ? "text-emerald-400" : "text-emerald-600"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={annual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="text-5xl font-extrabold"
                    >
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-sm mb-2 ${plan.featured ? "text-gray-400" : "text-gray-400"}`}>/mo</span>
                </div>
                <p className={`text-sm ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.featured ? "text-emerald-400" : "text-emerald-500"}`} />
                    <span className={plan.featured ? "text-gray-300" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 2. Feature Comparison Table

```tsx
"use client";
import { Check, X, HelpCircle } from "lucide-react";
import { useState } from "react";

interface Feature {
  name: string;
  tooltip?: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const features: Feature[] = [
  { name: "Projects", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Storage", starter: "10 GB", pro: "100 GB", enterprise: "1 TB" },
  { name: "Team members", starter: "1", pro: "10", enterprise: "Unlimited" },
  { name: "Analytics", tooltip: "Track usage and performance metrics", starter: false, pro: true, enterprise: true },
  { name: "Custom domains", starter: false, pro: true, enterprise: true },
  { name: "Priority support", starter: false, pro: true, enterprise: true },
  { name: "SSO / SAML", tooltip: "Single sign-on via your identity provider", starter: false, pro: false, enterprise: true },
  { name: "SLA guarantee", starter: false, pro: false, enterprise: true },
  { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm text-gray-700 font-medium">{value}</span>;
  if (value) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
  return <X className="w-5 h-5 text-gray-300 mx-auto" />;
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex ml-1.5 align-middle">
      <HelpCircle
        className="w-3.5 h-3.5 text-gray-400 cursor-help"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <span className="absolute z-10 bottom-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 w-48 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

export function FeatureComparisonTable() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Compare plans</h2>
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 w-1/2">Feature</th>
              {["Starter", "Pro", "Enterprise"].map((p) => (
                <th key={p} className="px-6 py-4 text-sm font-bold text-gray-900 text-center">
                  {p}
                  {p === "Pro" && (
                    <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {f.name}
                  {f.tooltip && <Tooltip text={f.tooltip} />}
                </td>
                <td className="px-6 py-4 text-center"><Cell value={f.starter} /></td>
                <td className="px-6 py-4 text-center bg-emerald-50/40"><Cell value={f.pro} /></td>
                <td className="px-6 py-4 text-center"><Cell value={f.enterprise} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## 3. Onboarding Stepper

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Create your account",
    description: "Set up your profile",
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work email</label>
          <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@company.com" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Set up your workspace",
    description: "Configure your environment",
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Workspace name</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Acme Corp" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Team size</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>1–5</option>
            <option>6–20</option>
            <option>21–100</option>
            <option>100+</option>
          </select>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Invite your team",
    description: "Collaborate together",
    content: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Invite by email</label>
          <div className="flex gap-2">
            <input type="email" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="teammate@company.com" />
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium">Add</button>
          </div>
        </div>
        <p className="text-sm text-gray-400">Skip this step — you can invite people later.</p>
      </div>
    ),
  },
  {
    id: 4,
    title: "You're all set!",
    description: "Start exploring",
    content: (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <p className="text-gray-600 text-sm">Your workspace is ready. Let's build something great.</p>
      </div>
    ),
  },
];

export function OnboardingStepper() {
  const [current, setCurrent] = useState(0);
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Step {current + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => i < current && setCurrent(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < current
                    ? "bg-blue-600 text-white cursor-pointer"
                    : i === current
                    ? "border-2 border-blue-600 text-blue-600"
                    : "bg-gray-100 text-gray-400 cursor-default"
                }`}
              >
                {i < current ? <Check className="w-4 h-4" /> : i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-1 transition-all duration-500 ${i < current ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-1">{steps[current].title}</h2>
            <p className="text-sm text-gray-500 mb-6">{steps[current].description}</p>
            {steps[current].content}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}
            disabled={current === steps.length - 1}
            className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {current === steps.length - 2 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Empty State Illustrations

```tsx
"use client";
import { motion } from "framer-motion";
import { Search, Database, Sparkles, Plus, RefreshCw } from "lucide-react";

type EmptyVariant = "no-data" | "no-results" | "first-use";

interface EmptyStateProps {
  variant: EmptyVariant;
  onAction?: () => void;
}

const config: Record<EmptyVariant, {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  bg: string;
  iconColor: string;
}> = {
  "no-data": {
    icon: <Database className="w-8 h-8" />,
    title: "No data yet",
    description: "Once you start adding data, it will show up here. Get started by creating your first entry.",
    cta: "Add your first item",
    bg: "bg-gray-100",
    iconColor: "text-gray-400",
  },
  "no-results": {
    icon: <Search className="w-8 h-8" />,
    title: "No results found",
    description: "We couldn't find anything matching your search. Try adjusting your filters or search terms.",
    cta: "Clear search",
    bg: "bg-orange-50",
    iconColor: "text-orange-400",
  },
  "first-use": {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Welcome! Let's get started",
    description: "This is your new workspace. Set it up in minutes and invite your team to collaborate.",
    cta: "Set up workspace",
    bg: "bg-blue-50",
    iconColor: "text-blue-400",
  },
};

export function EmptyState({ variant, onAction }: EmptyStateProps) {
  const c = config[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {/* Illustration placeholder */}
      <motion.div
        className={`w-20 h-20 ${c.bg} rounded-2xl flex items-center justify-center mb-6 ${c.iconColor}`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {c.icon}
      </motion.div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">{c.description}</p>

      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
      >
        {variant === "no-results" ? <RefreshCw className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {c.cta}
      </button>
    </motion.div>
  );
}

// Usage demo
export function EmptyStateDemo() {
  const [variant, setVariant] = useState<EmptyVariant>("first-use");
  return (
    <div>
      <div className="flex gap-2 justify-center mb-8">
        {(["no-data", "no-results", "first-use"] as EmptyVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${variant === v ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {v}
          </button>
        ))}
      </div>
      <EmptyState variant={variant} />
    </div>
  );
}
```

---

## 5. Notification Center

```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, X } from "lucide-react";

interface Notification {
  id: string;
  type: "mention" | "comment" | "system" | "alert";
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "mention", title: "Sarah mentioned you", body: "...in Design Review thread", time: "2m ago", read: false },
  { id: "2", type: "comment", title: "New comment on your post", body: "James left a comment: \"Looks great!\"", time: "15m ago", read: false },
  { id: "3", type: "system", title: "Export completed", body: "Your CSV export is ready to download.", time: "1h ago", read: false },
  { id: "4", type: "alert", title: "Usage limit warning", body: "You've used 90% of your storage.", time: "3h ago", read: true },
  { id: "5", type: "mention", title: "Alex replied to you", body: "...in the #general channel", time: "1d ago", read: true },
];

const typeColors: Record<Notification["type"], string> = {
  mention: "bg-blue-500",
  comment: "bg-purple-500",
  system: "bg-emerald-500",
  alert: "bg-amber-500",
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const dismiss = (id: string) => setNotifications((n) => n.filter((x) => x.id !== id));

  const groups = {
    new: notifications.filter((n) => !n.read),
    earlier: notifications.filter((n) => n.read),
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {(["new", "earlier"] as const).map((group) =>
                groups[group].length > 0 ? (
                  <div key={group}>
                    <p className="px-5 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                      {group === "new" ? "New" : "Earlier"}
                    </p>
                    {groups[group].map((n) => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group ${!n.read ? "bg-blue-50/40" : ""}`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${typeColors[n.type]} ${n.read ? "opacity-0" : ""}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                          <p className="text-xs text-gray-500 truncate">{n.body}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                        <button
                          onClick={() => dismiss(n.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-200 transition-all"
                        >
                          <X className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null
              )}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 6. Activity Feed

```tsx
"use client";
import { motion } from "framer-motion";
import { GitCommit, MessageSquare, UserPlus, FileText, Star } from "lucide-react";

type ActivityType = "commit" | "comment" | "join" | "document" | "star";

interface Activity {
  id: string;
  type: ActivityType;
  actor: { name: string; avatar: string; initials: string };
  action: string;
  target: string;
  timestamp: string;
}

const activities: Activity[] = [
  { id: "1", type: "commit", actor: { name: "Sarah Chen", avatar: "", initials: "SC" }, action: "pushed a commit to", target: "main branch", timestamp: "2 minutes ago" },
  { id: "2", type: "comment", actor: { name: "James Park", avatar: "", initials: "JP" }, action: "commented on", target: "Design System v2.0", timestamp: "14 minutes ago" },
  { id: "3", type: "join", actor: { name: "Mia Torres", avatar: "", initials: "MT" }, action: "joined the workspace", target: "", timestamp: "1 hour ago" },
  { id: "4", type: "document", actor: { name: "Alex Reid", avatar: "", initials: "AR" }, action: "created document", target: "Q4 Roadmap", timestamp: "3 hours ago" },
  { id: "5", type: "star", actor: { name: "Sarah Chen", avatar: "", initials: "SC" }, action: "starred", target: "API Documentation", timestamp: "1 day ago" },
];

const typeConfig: Record<ActivityType, { icon: React.ReactNode; bg: string; color: string }> = {
  commit: { icon: <GitCommit className="w-3.5 h-3.5" />, bg: "bg-purple-100", color: "text-purple-600" },
  comment: { icon: <MessageSquare className="w-3.5 h-3.5" />, bg: "bg-blue-100", color: "text-blue-600" },
  join: { icon: <UserPlus className="w-3.5 h-3.5" />, bg: "bg-emerald-100", color: "text-emerald-600" },
  document: { icon: <FileText className="w-3.5 h-3.5" />, bg: "bg-amber-100", color: "text-amber-600" },
  star: { icon: <Star className="w-3.5 h-3.5" />, bg: "bg-yellow-100", color: "text-yellow-600" },
};

const avatarColors = ["bg-rose-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-purple-400"];

export function ActivityFeed() {
  return (
    <div className="max-w-lg mx-auto py-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent activity</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gray-100" />

        <div className="space-y-1">
          {activities.map((activity, i) => {
            const tc = typeConfig[activity.type];
            const avatarColor = avatarColors[i % avatarColors.length];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-start gap-4 pl-2 pr-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {/* Avatar with type indicator */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className={`w-9 h-9 ${avatarColor} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {activity.actor.initials}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 ${tc.bg} ${tc.color} rounded-full flex items-center justify-center border-2 border-white`}>
                    {tc.icon}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{activity.actor.name}</span>{" "}
                    {activity.action}{" "}
                    {activity.target && <span className="font-medium text-blue-600 hover:underline cursor-pointer">{activity.target}</span>}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Stats Dashboard Row (KPI Cards with Sparklines)

```tsx
"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react";

interface KPI {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  sparkline: number[];
  color: string;
}

const kpis: KPI[] = [
  { label: "Total Revenue", value: "$48,295", change: 12.5, icon: <DollarSign className="w-5 h-5" />, sparkline: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80], color: "#3b82f6" },
  { label: "Active Users", value: "3,842", change: 8.2, icon: <Users className="w-5 h-5" />, sparkline: [20, 25, 30, 28, 35, 32, 40, 38, 45, 50], color: "#8b5cf6" },
  { label: "Orders", value: "1,294", change: -3.1, icon: <ShoppingCart className="w-5 h-5" />, sparkline: [60, 55, 50, 52, 45, 48, 42, 40, 38, 35], color: "#f59e0b" },
  { label: "Page Views", value: "94.2K", change: 22.4, icon: <Eye className="w-5 h-5" />, sparkline: [15, 20, 18, 25, 22, 30, 28, 35, 40, 48], color: "#10b981" },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`)
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={(width)}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="3"
        fill={color}
      />
    </svg>
  );
}

export function StatsDashboardRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-xl bg-gray-100 text-gray-600">{kpi.icon}</div>
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              kpi.change >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            }`}>
              {kpi.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(kpi.change)}%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-0.5">{kpi.value}</p>
          <p className="text-sm text-gray-500 mb-4">{kpi.label}</p>
          <Sparkline data={kpi.sparkline} color={kpi.color} />
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 8. Data Table with Filters

```tsx
"use client";
import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, Filter } from "lucide-react";

interface Row {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

const data: Row[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "active", joined: "2024-01-15" },
  { id: "2", name: "James Park", email: "james@example.com", role: "Editor", status: "active", joined: "2024-02-20" },
  { id: "3", name: "Mia Torres", email: "mia@example.com", role: "Viewer", status: "pending", joined: "2024-03-05" },
  { id: "4", name: "Alex Reid", email: "alex@example.com", role: "Editor", status: "inactive", joined: "2023-11-10" },
  { id: "5", name: "Jordan Lee", email: "jordan@example.com", role: "Admin", status: "active", joined: "2024-04-01" },
  { id: "6", name: "Casey Kim", email: "casey@example.com", role: "Viewer", status: "active", joined: "2024-04-18" },
];

type SortDir = "asc" | "desc" | null;
type SortKey = keyof Row | null;

const PAGE_SIZE = 4;

const statusBadge: Record<Row["status"], string> = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-gray-100 text-gray-500",
  pending: "bg-amber-100 text-amber-700",
};

export function DataTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Row["status"] | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleSort = (key: keyof Row) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search) rows = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") rows = rows.filter((r) => r.status === statusFilter);
    if (sortKey && sortDir) {
      rows.sort((a, b) => {
        const av = a[sortKey]; const bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [search, statusFilter, sortKey, sortDir]);

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function SortIcon({ col }: { col: keyof Row }) {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-300" />;
    if (sortDir === "asc") return <ChevronUp className="w-3.5 h-3.5 text-gray-600" />;
    return <ChevronDown className="w-3.5 h-3.5 text-gray-600" />;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-gray-100">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search users..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as Row["status"] | "all"); setPage(0); }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {[
                { key: "name", label: "Name" },
                { key: "role", label: "Role" },
                { key: "status", label: "Status" },
                { key: "joined", label: "Joined" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof Row)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key as keyof Row} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 w-12" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{row.name}</p>
                    <p className="text-xs text-gray-400">{row.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{row.joined}</td>
                <td className="px-4 py-3 relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                  {openMenu === row.id && (
                    <div className="absolute right-2 top-10 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 w-36">
                      {["Edit", "View profile", "Remove"].map((action) => (
                        <button
                          key={action}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${action === "Remove" ? "text-red-500" : "text-gray-700"}`}
                          onClick={() => setOpenMenu(null)}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
        </p>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                page === i ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 9. Kanban Board

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Plus, MoreHorizontal, GripVertical } from "lucide-react";

interface Card {
  id: string;
  title: string;
  tag?: string;
  tagColor?: string;
  assignee?: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

const initialColumns: Column[] = [
  {
    id: "backlog", title: "Backlog", color: "bg-gray-400",
    cards: [
      { id: "c1", title: "Research competitor pricing", tag: "Research", tagColor: "bg-purple-100 text-purple-700", assignee: "SC" },
      { id: "c2", title: "Update onboarding flow", tag: "UX", tagColor: "bg-blue-100 text-blue-700", assignee: "JP" },
    ],
  },
  {
    id: "todo", title: "To Do", color: "bg-amber-400",
    cards: [
      { id: "c3", title: "Implement dark mode toggle", tag: "Frontend", tagColor: "bg-amber-100 text-amber-700", assignee: "AR" },
      { id: "c4", title: "Write API documentation", tag: "Docs", tagColor: "bg-gray-100 text-gray-700" },
    ],
  },
  {
    id: "in-progress", title: "In Progress", color: "bg-blue-500",
    cards: [
      { id: "c5", title: "Design system audit", tag: "Design", tagColor: "bg-pink-100 text-pink-700", assignee: "MT" },
    ],
  },
  {
    id: "done", title: "Done", color: "bg-emerald-500",
    cards: [
      { id: "c6", title: "Set up CI/CD pipeline", tag: "DevOps", tagColor: "bg-emerald-100 text-emerald-700", assignee: "SC" },
      { id: "c7", title: "User interviews — Q1", tag: "Research", tagColor: "bg-purple-100 text-purple-700" },
    ],
  },
];

const avatarColors: Record<string, string> = {
  SC: "bg-rose-400", JP: "bg-blue-400", AR: "bg-amber-400", MT: "bg-emerald-400",
};

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState("");

  const addCard = (colId: string) => {
    if (!newCardTitle.trim()) { setAddingTo(null); return; }
    setColumns((cols) =>
      cols.map((c) =>
        c.id === colId
          ? { ...c, cards: [...c.cards, { id: `c${Date.now()}`, title: newCardTitle.trim() }] }
          : c
      )
    );
    setNewCardTitle("");
    setAddingTo(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 p-4">
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-72">
          {/* Column header */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
            <span className="text-sm font-semibold text-gray-700">{col.title}</span>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {col.cards.length}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Cards */}
          <Reorder.Group
            axis="y"
            values={col.cards}
            onReorder={(cards) =>
              setColumns((cols) => cols.map((c) => (c.id === col.id ? { ...c, cards } : c)))
            }
            className="space-y-2 min-h-[60px]"
          >
            <AnimatePresence>
              {col.cards.map((card) => (
                <Reorder.Item key={card.id} value={card} className="cursor-grab active:cursor-grabbing">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        {card.tag && (
                          <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mb-2 ${card.tagColor}`}>
                            {card.tag}
                          </span>
                        )}
                        <p className="text-sm text-gray-800 leading-snug">{card.title}</p>
                        {card.assignee && (
                          <div className="mt-2 flex justify-end">
                            <div className={`w-6 h-6 rounded-full ${avatarColors[card.assignee] || "bg-gray-300"} flex items-center justify-center text-white text-[10px] font-bold`}>
                              {card.assignee}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {/* Add card */}
          <AnimatePresence>
            {addingTo === col.id ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 bg-white border border-gray-200 rounded-xl p-3"
              >
                <textarea
                  autoFocus
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addCard(col.id); } if (e.key === "Escape") setAddingTo(null); }}
                  placeholder="Card title..."
                  rows={2}
                  className="w-full text-sm resize-none border-none outline-none text-gray-800 placeholder-gray-400"
                />
                <div className="flex gap-2 mt-2">
                  <button onClick={() => addCard(col.id)} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 font-medium">Add</button>
                  <button onClick={() => setAddingTo(null)} className="px-3 py-1.5 text-gray-500 text-xs hover:bg-gray-100 rounded-lg">Cancel</button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setAddingTo(col.id)}
                className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" /> Add card
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

---

## 10. Command Palette

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Settings, Users, BarChart2, ArrowRight, Clock, Hash } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  shortcut?: string;
  recent?: boolean;
}

const allCommands: CommandItem[] = [
  { id: "1", label: "New document", category: "Create", icon: <FileText className="w-4 h-4" />, shortcut: "⌘N" },
  { id: "2", label: "Open settings", category: "Navigate", icon: <Settings className="w-4 h-4" />, shortcut: "⌘," },
  { id: "3", label: "View team members", category: "Navigate", icon: <Users className="w-4 h-4" /> },
  { id: "4", label: "Analytics dashboard", category: "Navigate", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "5", label: "Q4 Roadmap", category: "Recent", icon: <Clock className="w-4 h-4" />, recent: true },
  { id: "6", label: "Design System Docs", category: "Recent", icon: <Clock className="w-4 h-4" />, recent: true },
  { id: "7", label: "#general channel", category: "Channels", icon: <Hash className="w-4 h-4" /> },
  { id: "8", label: "#engineering", category: "Channels", icon: <Hash className="w-4 h-4" /> },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setSelected(0); }
  }, [open]);

  const filtered = query
    ? allCommands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : allCommands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flat = Object.values(grouped).flat();

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, flat.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { setOpen(false); setQuery(""); }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-500 text-sm rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="ml-2 text-[11px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={handleKey}
                  placeholder="Type a command or search..."
                  className="flex-1 text-sm text-gray-900 outline-none placeholder-gray-400"
                />
                <kbd className="text-[11px] bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-gray-400">Esc</kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {flat.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">No results for "{query}"</p>
                ) : (
                  Object.entries(grouped).map(([category, items]) => {
                    let globalIdx = flat.indexOf(items[0]);
                    return (
                      <div key={category}>
                        <p className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{category}</p>
                        {items.map((item, i) => {
                          const idx = globalIdx + i;
                          return (
                            <button
                              key={item.id}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={() => { setOpen(false); setQuery(""); }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                selected === idx ? "bg-gray-100" : "hover:bg-gray-50"
                              }`}
                            >
                              <span className="text-gray-400">{item.icon}</span>
                              <span className="flex-1 text-left text-gray-800">{item.label}</span>
                              {item.shortcut && (
                                <kbd className="text-[11px] text-gray-400 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">
                                  {item.shortcut}
                                </kbd>
                              )}
                              {selected === idx && <ArrowRight className="w-3.5 h-3.5 text-gray-400" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```
