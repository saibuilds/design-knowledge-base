# Refero SaaS UI Patterns — Part 2 (Components 11–20 + MagicUI / Aceternity / 21st.dev)

---

## 11. Settings Page Layout

```tsx
"use client";
import { useState } from "react";
import { User, Bell, Shield, CreditCard, Users, Plug, ChevronRight } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, badge: "3" },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
  { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
  { id: "integrations", label: "Integrations", icon: <Plug className="w-4 h-4" /> },
];

const sections: Record<string, React.ReactNode> = {
  profile: (
    <div>
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Profile</h2>
        <p className="text-sm text-gray-500">Update your personal information.</p>
      </div>
      <div className="space-y-6 max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
              Change avatar
            </button>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
        {[{ label: "Full name", value: "John Doe" }, { label: "Email", value: "john@example.com" }, { label: "Username", value: "johndoe" }].map((f) => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
            <input
              defaultValue={f.value}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Tell your team about yourself..."
          />
        </div>
        <div className="pt-2">
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
            Save changes
          </button>
        </div>
      </div>
    </div>
  ),
  notifications: (
    <div>
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h2>
        <p className="text-sm text-gray-500">Choose how you want to be notified.</p>
      </div>
      <div className="space-y-4 max-w-md">
        {[
          { label: "Mentions", desc: "When someone @mentions you" },
          { label: "Comments", desc: "Replies to your posts" },
          { label: "System alerts", desc: "Important system notifications" },
          { label: "Weekly digest", desc: "Summary of activity every Monday" },
        ].map((item) => (
          <div key={item.label} className="flex items-start justify-between py-3 border-b border-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-4" />
            </label>
          </div>
        ))}
      </div>
    </div>
  ),
};

export function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-52 flex-shrink-0">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active === item.id
                        ? "bg-white shadow-sm text-gray-900 border border-gray-200"
                        : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {active === item.id && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8">
            {sections[active] ?? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{navItems.find((n) => n.id === active)?.label}</h2>
                <p className="text-sm text-gray-400">This section is under construction.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 12. User Profile Card

```tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, LinkIcon, Twitter } from "lucide-react";

interface ProfileCardProps {
  name: string;
  username: string;
  bio: string;
  location?: string;
  website?: string;
  twitter?: string;
  stats: { label: string; value: string }[];
  initials: string;
  avatarColor: string;
  isFollowing?: boolean;
}

export function UserProfileCard({
  name = "Sarah Chen",
  username = "sarahchen",
  bio = "Product designer & developer. Building tools that help teams ship faster. Open to collabs.",
  location = "San Francisco, CA",
  website = "sarahchen.design",
  twitter = "sarahchenux",
  stats = [
    { label: "Projects", value: "42" },
    { label: "Followers", value: "1.2K" },
    { label: "Following", value: "184" },
  ],
  initials = "SC",
  avatarColor = "from-rose-400 to-pink-500",
  isFollowing: defaultFollowing = false,
}: Partial<ProfileCardProps>) {
  const [following, setFollowing] = useState(defaultFollowing);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden w-full max-w-sm shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Banner */}
      <div className="h-20 bg-gradient-to-r from-violet-100 via-blue-50 to-emerald-100" />

      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="-mt-8 mb-3 flex items-end justify-between">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xl font-bold border-4 border-white shadow`}>
            {initials}
          </div>
          <motion.button
            onClick={() => setFollowing((f) => !f)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 text-sm font-semibold rounded-xl border transition-all ${
              following
                ? "border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
                : "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
            }`}
          >
            {following ? "Following" : "Follow"}
          </motion.button>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-400 mb-2">@{username}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{bio}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs text-gray-400">
          {location && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</span>
          )}
          {website && (
            <span className="flex items-center gap-1 text-blue-500"><LinkIcon className="w-3 h-3" />{website}</span>
          )}
          {twitter && (
            <span className="flex items-center gap-1"><Twitter className="w-3 h-3" />@{twitter}</span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-base font-bold text-gray-900">{s.value}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

---

## 13. Team Members Grid

```tsx
"use client";
import { motion } from "framer-motion";
import { MoreHorizontal, Mail, Shield } from "lucide-react";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  avatarColor: string;
  online: boolean;
  roleType: "admin" | "editor" | "viewer";
}

const members: Member[] = [
  { id: "1", name: "Sarah Chen", role: "Product Lead", email: "sarah@acme.com", initials: "SC", avatarColor: "from-rose-400 to-pink-500", online: true, roleType: "admin" },
  { id: "2", name: "James Park", role: "Engineer", email: "james@acme.com", initials: "JP", avatarColor: "from-blue-400 to-cyan-500", online: true, roleType: "editor" },
  { id: "3", name: "Mia Torres", role: "Designer", email: "mia@acme.com", initials: "MT", avatarColor: "from-emerald-400 to-teal-500", online: false, roleType: "editor" },
  { id: "4", name: "Alex Reid", role: "Marketing", email: "alex@acme.com", initials: "AR", avatarColor: "from-amber-400 to-orange-500", online: false, roleType: "viewer" },
  { id: "5", name: "Jordan Lee", role: "Engineer", email: "jordan@acme.com", initials: "JL", avatarColor: "from-violet-400 to-purple-500", online: true, roleType: "editor" },
  { id: "6", name: "Casey Kim", role: "Support", email: "casey@acme.com", initials: "CK", avatarColor: "from-pink-400 to-rose-500", online: false, roleType: "viewer" },
];

const roleBadge: Record<Member["roleType"], string> = {
  admin: "bg-purple-100 text-purple-700",
  editor: "bg-blue-100 text-blue-700",
  viewer: "bg-gray-100 text-gray-600",
};

export function TeamMembersGrid() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Team members <span className="ml-2 text-sm font-normal text-gray-400">{members.length}</span></h2>
        <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
          Invite member
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow relative"
          >
            {/* Menu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
              {openMenu === m.id && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-1 w-36">
                  {["View profile", "Send message", "Change role", "Remove"].map((a) => (
                    <button key={a} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${a === "Remove" ? "text-red-500" : "text-gray-700"}`} onClick={() => setOpenMenu(null)}>
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar + online */}
            <div className="relative w-12 h-12 mb-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white font-bold`}>
                {m.initials}
              </div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${m.online ? "bg-emerald-500" : "bg-gray-300"}`} />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">{m.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{m.role}</p>

            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${roleBadge[m.roleType]}`}>
                {m.roleType === "admin" && <Shield className="w-2.5 h-2.5" />}
                {m.roleType}
              </span>
              <a href={`mailto:${m.email}`} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

---

## 14. Plan Upgrade Prompt (Inline Banner)

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check } from "lucide-react";

interface UpgradeBannerProps {
  features?: string[];
  onUpgrade?: () => void;
}

export function UpgradeBanner({
  features = ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"],
  onUpgrade,
}: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          className="relative bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-5 text-white overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-8 w-28 h-28 rounded-full bg-white/5" />

          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-base mb-0.5">Upgrade to Pro</h3>
              <p className="text-sm text-white/70 mb-3">Unlock everything your team needs to move faster.</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-white/80">
                    <Check className="w-3 h-3 text-emerald-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onUpgrade}
              className="flex-shrink-0 px-5 py-2.5 bg-white text-violet-700 text-sm font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Upgrade — $29/mo
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 15. Auth Pages

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Github, Chrome } from "lucide-react";

type AuthView = "signin" | "signup" | "forgot";

function InputField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="space-y-3">
      {[
        { label: "Continue with Google", icon: <Chrome className="w-4 h-4" /> },
        { label: "Continue with GitHub", icon: <Github className="w-4 h-4" /> },
      ].map((btn) => (
        <button
          key={btn.label}
          className="w-full flex items-center justify-center gap-2.5 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {btn.icon}
          {btn.label}
        </button>
      ))}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </div>
  );
}

export function AuthPage() {
  const [view, setView] = useState<AuthView>("signin");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {view === "signin" && (
              <>
                <div className="mb-8">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">A</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
                  <p className="text-sm text-gray-500">Sign in to your account to continue.</p>
                </div>
                <SocialButtons />
                <div className="space-y-4">
                  <InputField label="Email" type="email" placeholder="you@example.com" />
                  <InputField label="Password" type="password" placeholder="••••••••" />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      Remember me
                    </label>
                    <button onClick={() => setView("forgot")} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </button>
                  </div>
                  <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                    Sign in
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-6">
                  Don't have an account?{" "}
                  <button onClick={() => setView("signup")} className="text-blue-600 font-medium hover:text-blue-700">Sign up</button>
                </p>
              </>
            )}

            {view === "signup" && (
              <>
                <div className="mb-8">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">A</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
                  <p className="text-sm text-gray-500">Start your 14-day free trial. No credit card required.</p>
                </div>
                <SocialButtons />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="First name" placeholder="John" />
                    <InputField label="Last name" placeholder="Doe" />
                  </div>
                  <InputField label="Work email" type="email" placeholder="john@company.com" />
                  <InputField label="Password" type="password" placeholder="Min 8 characters" />
                  <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                    Create account
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By signing up you agree to our{" "}
                    <a href="#" className="text-blue-600 underline">Terms</a> and{" "}
                    <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                  </p>
                </div>
                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account?{" "}
                  <button onClick={() => setView("signin")} className="text-blue-600 font-medium hover:text-blue-700">Sign in</button>
                </p>
              </>
            )}

            {view === "forgot" && (
              <>
                <div className="mb-8">
                  <button onClick={() => setView("signin")} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">
                    ← Back
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset password</h1>
                  <p className="text-sm text-gray-500">We'll send a reset link to your email.</p>
                </div>
                <div className="space-y-4">
                  <InputField label="Email" type="email" placeholder="you@example.com" />
                  <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                    Send reset link
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## 16. App Sidebar (Collapsible)

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Users, BarChart2, Settings, ChevronRight,
  ChevronLeft, Bell, HelpCircle, LogOut, Dot
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  {
    id: "projects", label: "Projects", icon: <FolderOpen className="w-4 h-4" />, badge: 3,
    children: [{ id: "all", label: "All Projects" }, { id: "active", label: "Active" }, { id: "archived", label: "Archived" }],
  },
  { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
  { id: "analytics", label: "Analytics", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, badge: 5 },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-gray-900 text-white overflow-hidden border-r border-gray-800"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-800 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-sm whitespace-nowrap"
            >
              Acme Corp
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                setActive(item.id);
                if (item.children) setExpanded(expanded === item.id ? null : item.id);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active === item.id || expanded === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 text-left whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && item.badge && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {!collapsed && item.children && (
                <ChevronRight className={`w-3.5 h-3.5 text-gray-500 transition-transform ${expanded === item.id ? "rotate-90" : ""}`} />
              )}
            </button>

            {/* Nested items */}
            <AnimatePresence>
              {!collapsed && expanded === item.id && item.children && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-4 mt-1 space-y-1 overflow-hidden"
                >
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActive(child.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                        active === child.id ? "text-white bg-gray-800" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <Dot className="w-4 h-4" />
                      {child.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-4 border-t border-gray-800 space-y-1">
        {[
          { icon: <HelpCircle className="w-4 h-4" />, label: "Help" },
          { icon: <Settings className="w-4 h-4" />, label: "Settings" },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 transition-all">
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </button>
        ))}

        {/* User footer */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-200 truncate">John Doe</p>
              <p className="text-[11px] text-gray-500 truncate">john@acme.com</p>
            </div>
          )}
          {!collapsed && <LogOut className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-gray-300 flex-shrink-0" />}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 w-6 h-6 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3 text-gray-300" /> : <ChevronLeft className="w-3 h-3 text-gray-300" />}
      </button>
    </motion.div>
  );
}
```

---

## 17. Top Navigation Bar

```tsx
"use client";
import { useState } from "react";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = ["Product", "Features", "Pricing", "Docs", "Blog"];

export function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="font-bold text-gray-900 hidden sm:block">Acme</span>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <a key={link} href="#" className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium">
              {link}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <input
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  placeholder="Search..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </AnimatePresence>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar menu */}
          <div className="relative">
            <button
              onClick={() => setAvatarOpen((o) => !o)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <AnimatePresence>
              {avatarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-xl w-52 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-400">john@acme.com</p>
                  </div>
                  {["Profile", "Settings", "Billing", "Team"].map((item) => (
                    <button key={item} onClick={() => setAvatarOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                      {item}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Sign out</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen((o) => !o)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a key={link} href="#" className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  {link}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

---

## 18. Modal with Form

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
}

export function InviteModal({ open, onClose }: ModalProps) {
  const [form, setForm] = useState({ name: "", email: "", role: "editor" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => { onClose(); setSuccess(false); setForm({ name: "", email: "", role: "editor" }); }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Invite team member</h2>
                  <p className="text-sm text-gray-400 mt-0.5">They'll receive an email invitation.</p>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <div className="px-6 py-5 space-y-4">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-emerald-600 text-xl">✓</span>
                    </div>
                    <p className="font-medium text-gray-900">Invitation sent!</p>
                  </motion.div>
                ) : (
                  <>
                    {[
                      { key: "name", label: "Full name", type: "text", placeholder: "John Doe" },
                      { key: "email", label: "Email address", type: "email", placeholder: "john@company.com" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => { setForm((f) => ({ ...f, [field.key]: e.target.value })); setErrors((er) => ({ ...er, [field.key]: undefined })); }}
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors[field.key as keyof FormErrors] ? "border-red-400 bg-red-50" : "border-gray-300"
                          }`}
                        />
                        {errors[field.key as keyof FormErrors] && (
                          <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[field.key as keyof FormErrors]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="admin">Admin — full access</option>
                        <option value="editor">Editor — can edit content</option>
                        <option value="viewer">Viewer — read only</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {!success && (
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-xl transition-colors font-medium">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {submitting && (
                      <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {submitting ? "Sending..." : "Send invite"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## 19. Toast / Notification Stack

```tsx
"use client";
import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface ToastContextValue {
  toast: (t: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const barColors: Record<ToastType, string> = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-80"
    >
      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${barColors[toast.type]}`}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: (toast.duration ?? 4000) / 1000, ease: "linear" }}
        onAnimationComplete={() => onRemove(toast.id)}
      />

      <div className="flex items-start gap-3 px-4 py-4 pr-10">
        <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
          {toast.message && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{toast.message}</p>}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-xs text-blue-600 font-semibold mt-2 hover:text-blue-700"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X className="w-3.5 h-3.5 text-gray-400" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence mode="sync">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={remove} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// Usage demo button
export function ToastDemo() {
  const { toast } = useToast();
  const examples: Array<Omit<Toast, "id">> = [
    { type: "success", title: "Changes saved", message: "Your profile has been updated successfully." },
    { type: "error", title: "Something went wrong", message: "We couldn't process your request. Please try again.", action: { label: "Retry", onClick: () => {} } },
    { type: "warning", title: "Storage nearly full", message: "You've used 90% of your 10 GB storage." },
    { type: "info", title: "New update available", message: "Version 2.4.0 is ready to install.", action: { label: "Update now", onClick: () => {} } },
  ];

  return (
    <div className="flex flex-wrap gap-3 p-6">
      {examples.map((ex) => (
        <button
          key={ex.type}
          onClick={() => toast(ex)}
          className={`px-4 py-2 rounded-xl text-sm font-medium text-white transition-all ${
            { success: "bg-emerald-600 hover:bg-emerald-700", error: "bg-red-500 hover:bg-red-600", warning: "bg-amber-500 hover:bg-amber-600", info: "bg-blue-600 hover:bg-blue-700" }[ex.type]
          }`}
        >
          {ex.type} toast
        </button>
      ))}
    </div>
  );
}
```

---

## 20. Skeleton Loading States

```tsx
"use client";
import { motion } from "framer-motion";

// Base shimmer animation
function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded-lg overflow-hidden relative ${className}`}
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}

// List skeleton
export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4">
          <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5" style={{ width: `${50 + (i * 13) % 35}%` }} />
            <Skeleton className="h-3" style={{ width: `${30 + (i * 17) % 25}%` }} />
          </div>
          <Skeleton className="h-3 w-16 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex gap-4 border-b border-gray-100">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3" style={{ width: i === 0 ? "30%" : `${15 + i * 5}%` }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className={`px-4 py-3.5 flex gap-4 items-center ${r !== rows - 1 ? "border-b border-gray-50" : ""}`}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-3.5" style={{ width: c === 0 ? "30%" : `${15 + c * 5}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// Stats row skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="w-9 h-9 rounded-xl" />
            <Skeleton className="w-14 h-6 rounded-full" />
          </div>
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
      ))}
    </div>
  );
}

// Full page demo
export function SkeletonDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Stats skeleton</h3>
        <StatsSkeleton />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Card skeleton</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Table skeleton</h3>
        <TableSkeleton />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">List skeleton</h3>
        <ListSkeleton />
      </div>
    </div>
  );
}
```

---

## 21. MagicUI — Animated Beam

```tsx
"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BeamProps {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  color?: string;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 50,
  color = "#6366f1",
  duration = 2,
  delay = 0,
  reverse = false,
}: BeamProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current || !svgRef.current || !pathRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const from = {
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      };
      const to = {
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      };

      const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - curvature };
      const d = `M ${from.x} ${from.y} Q ${mid.x} ${mid.y} ${to.x} ${to.y}`;
      pathRef.current.setAttribute("d", d);

      const totalLength = pathRef.current.getTotalLength();
      svgRef.current.setAttribute("width", String(containerRect.width));
      svgRef.current.setAttribute("height", String(containerRect.height));
      pathRef.current.style.strokeDasharray = `${totalLength}`;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`beam-grad-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Base path */}
      <path ref={pathRef} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
      {/* Animated beam */}
      <path
        fill="none"
        stroke={`url(#beam-grad-${delay})`}
        strokeWidth="2"
        style={{
          animation: `beam-move ${duration}s linear ${delay}s infinite`,
          strokeDashoffset: reverse ? "-100%" : "100%",
        }}
      />
      <style>{`
        @keyframes beam-move {
          from { stroke-dashoffset: ${reverse ? "-200%" : "200%"}; }
          to { stroke-dashoffset: ${reverse ? "0%" : "0%"}; }
        }
      `}</style>
    </svg>
  );
}

// Demo usage
export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="relative w-full h-48 flex items-center justify-between px-12">
      {[
        { ref: leftRef, label: "Input", color: "bg-blue-100 border-blue-300" },
        { ref: centerRef, label: "AI", color: "bg-violet-100 border-violet-300" },
        { ref: rightRef, label: "Output", color: "bg-emerald-100 border-emerald-300" },
      ].map((n) => (
        <div key={n.label} ref={n.ref as React.RefObject<HTMLDivElement>} className={`w-16 h-16 rounded-2xl ${n.color} border-2 flex items-center justify-center text-sm font-bold text-gray-700 z-10`}>
          {n.label}
        </div>
      ))}
      <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={leftRef as React.RefObject<HTMLElement>} toRef={centerRef as React.RefObject<HTMLElement>} color="#6366f1" curvature={-40} />
      <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={centerRef as React.RefObject<HTMLElement>} toRef={rightRef as React.RefObject<HTMLElement>} color="#10b981" curvature={-40} delay={0.5} />
    </div>
  );
}
```

---

## 22. MagicUI — Border Beam

```tsx
"use client";
import { useRef } from "react";
import { CSSProperties } from "react";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  size = 200,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#6366f1",
  colorTo = "#06b6d4",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={{ "--size": `${size}px`, "--duration": `${duration}s`, "--border-width": `${borderWidth}px`, "--color-from": colorFrom, "--color-to": colorTo, "--delay": `${-delay}s` } as CSSProperties}
    >
      <div
        className="absolute inset-[-1px] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, var(--color-from) 90deg, var(--color-to) 180deg, transparent 270deg)`,
          animation: `border-beam-spin var(--duration) linear var(--delay) infinite`,
          WebkitMaskImage: `radial-gradient(circle at center, transparent calc(100% - var(--border-width)), black calc(100% - var(--border-width)))`,
          maskImage: `radial-gradient(circle at center, transparent calc(100% - var(--border-width)), black calc(100% - var(--border-width)))`,
        }}
      />
      <style>{`@keyframes border-beam-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Usage
export function BorderBeamCard() {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 w-72">
      <BorderBeam colorFrom="#8b5cf6" colorTo="#3b82f6" duration={6} />
      <h3 className="text-base font-bold text-gray-900 mb-2">Pro Plan</h3>
      <p className="text-sm text-gray-500">Unlock all features with our most popular plan.</p>
      <button className="mt-4 w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800">
        Get started
      </button>
    </div>
  );
}
```

---

## 23. MagicUI — Shimmer Button

```tsx
"use client";
import { CSSProperties, ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  shimmerColor?: string;
  background?: string;
  borderRadius?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  shimmerColor = "rgba(255,255,255,0.4)",
  background = "#1a1a1a",
  borderRadius = "12px",
  shimmerSize = "0.05em",
  shimmerDuration = "2s",
  className = "",
  onClick,
}: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        "--shimmer-color": shimmerColor,
        "--background": background,
        "--border-radius": borderRadius,
        "--shimmer-size": shimmerSize,
        "--shimmer-duration": shimmerDuration,
      } as CSSProperties}
      className={`group relative cursor-pointer overflow-hidden px-6 py-2.5 text-sm font-semibold text-white transition-all active:scale-95 ${className}`}
      style={{ borderRadius, background }}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-100%",
            background: `conic-gradient(from 90deg at 50% 50%, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg)`,
            animation: `shimmer-spin ${shimmerDuration} linear infinite`,
          }}
        />
      </div>
      {/* Dark overlay to make button readable */}
      <div className="absolute inset-[1.5px] rounded-[10px]" style={{ background }} />
      <span className="relative z-10">{children}</span>
      <style>{`@keyframes shimmer-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
```

---

## 24. MagicUI — Blur Fade

```tsx
"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  inView?: boolean;
  className?: string;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 8,
  blur = "8px",
  className = "",
}: BlurFadeProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Word rotate variant
export function WordRotate({ words, duration = 2500 }: { words: string[]; duration?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), duration);
    return () => clearInterval(timer);
  }, [words.length, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
        transition={{ duration: 0.4 }}
        className="inline-block"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

// HyperText — character scramble
import { useEffect, useState } from "react";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function HyperText({ text, duration = 800, className = "" }: { text: string; duration?: number; className?: string }) {
  const [display, setDisplay] = useState(text);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) { setDisplay(text); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i < iteration) return text[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, duration / (text.length * 3));
    return () => clearInterval(interval);
  }, [hovered, text, duration]);

  return (
    <span
      className={`font-mono cursor-default ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {display}
    </span>
  );
}
```

---

## 25. Aceternity — Wavy Background

```tsx
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface WavyBackgroundProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}

export function WavyBackground({
  children,
  className = "",
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 50,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let nt = 0;

    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);

    const drawWave = (n: number) => {
      nt += speed === "fast" ? 0.002 : 0.001;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.globalAlpha = waveOpacity;
        for (let x = 0; x < w; x += 5) {
          const y = Math.sin((x / w) * Math.PI * 2 + nt + i * 0.5) * 60 + h / 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.filter = `blur(${blur}px)`;
      drawWave(5);
      animRef.current = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [blur, colors, speed, waveOpacity, waveWidth]);

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-white ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

## 26. Aceternity — Floating Dock

```tsx
"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
}

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null);

  const dist = useTransform(mouseX, (val) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const widthTransform = useTransform(dist, [-80, 0, 80], [40, 64, 40]);
  const width = useSpring(widthTransform, { stiffness: 300, damping: 20 });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
    >
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
        >
          {item.label}
        </motion.span>
      )}
      <div className="text-gray-700">{item.icon}</div>
    </motion.div>
  );
}

export function FloatingDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-16 items-end gap-2 rounded-2xl bg-white/90 backdrop-blur border border-gray-200 shadow-xl px-4 pb-3"
    >
      {items.map((item) => (
        <DockIcon key={item.id} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}
```

---

## 27. Aceternity — Animated Tooltip

```tsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TooltipAvatarProps {
  items: { name: string; initials: string; color: string; role?: string }[];
}

export function AnimatedTooltipAvatars({ items }: TooltipAvatarProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-24, 24]), springConfig);

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const halfW = rect.width / 2;
    x.set(e.clientX - rect.left - halfW);
  };

  return (
    <div className="flex -space-x-3">
      {items.map((item, i) => (
        <div
          key={item.name}
          className="relative"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={(e) => handleMouseMove(e, i)}
          style={{ zIndex: hovered === i ? 50 : items.length - i }}
        >
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.8 }}
                style={{ translateX, rotate }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-xl px-3 py-2 whitespace-nowrap shadow-xl z-50"
              >
                <div className="font-semibold">{item.name}</div>
                {item.role && <div className="text-gray-400 text-[11px]">{item.role}</div>}
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white cursor-pointer`}>
            {item.initials}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 28. 21st.dev — Split Button

```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, Share, Copy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SplitButtonOption {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface SplitButtonProps {
  label: string;
  onClick: () => void;
  options: SplitButtonOption[];
  variant?: "primary" | "secondary";
}

export function SplitButton({ label, onClick, options, variant = "primary" }: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const base = variant === "primary"
    ? "bg-gray-900 text-white hover:bg-gray-800 border-gray-700"
    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-l-xl border transition-colors ${base}`}
      >
        {label}
      </button>
      <div className={`w-px self-stretch ${variant === "primary" ? "bg-gray-700" : "bg-gray-200"}`} />
      <button
        onClick={() => setOpen((o) => !o)}
        className={`px-2.5 py-2.5 rounded-r-xl border border-l-0 text-sm font-medium transition-colors ${base}`}
        aria-label="More options"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-1 min-w-[160px]"
          >
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => { opt.onClick(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-400">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Demo
export function SplitButtonDemo() {
  return (
    <SplitButton
      label="Export"
      onClick={() => alert("Export clicked")}
      options={[
        { label: "Download CSV", icon: <Download className="w-4 h-4" />, onClick: () => {} },
        { label: "Copy link", icon: <Copy className="w-4 h-4" />, onClick: () => {} },
        { label: "Share", icon: <Share className="w-4 h-4" />, onClick: () => {} },
      ]}
    />
  );
}
```

---

## 29. 21st.dev — Segmented Control

```tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Segment {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

export function SegmentedControl({ segments, value, onChange, size = "md" }: SegmentedControlProps) {
  const activeIdx = segments.findIndex((s) => s.value === value);
  const sizeClasses = size === "sm" ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2";

  return (
    <div className="relative inline-flex bg-gray-100 rounded-xl p-1 gap-0.5">
      {/* Animated indicator */}
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
        animate={{ left: `calc(${activeIdx} * (100% - 8px) / ${segments.length} + 4px)`, width: `calc((100% - 8px) / ${segments.length})` }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ left: 4, width: `calc((100% - 8px) / ${segments.length})` }}
      />

      {segments.map((seg) => (
        <button
          key={seg.value}
          onClick={() => onChange(seg.value)}
          className={`relative z-10 flex items-center gap-1.5 font-medium transition-colors rounded-lg ${sizeClasses} ${
            value === seg.value ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {seg.icon}
          {seg.label}
        </button>
      ))}
    </div>
  );
}

// Usage demo
export function SegmentedControlDemo() {
  const [view, setView] = useState("list");
  return (
    <SegmentedControl
      value={view}
      onChange={setView}
      segments={[
        { value: "list", label: "List" },
        { value: "grid", label: "Grid" },
        { value: "kanban", label: "Kanban" },
      ]}
    />
  );
}
```

---

## 30. 21st.dev — Color Picker

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Pipette } from "lucide-react";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#1a1a1a",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value = "#3b82f6", onChange }: Partial<ColorPickerProps>) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const [customHex, setCustomHex] = useState(value);

  const select = (color: string) => {
    setHex(color);
    setCustomHex(color);
    onChange?.(color);
  };

  const handleCustom = (val: string) => {
    setCustomHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) select(val);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
      >
        <span className="w-5 h-5 rounded-lg border border-black/10 shadow-inner" style={{ background: hex }} />
        <span className="text-sm font-mono text-gray-700">{hex}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 w-56 z-50"
          >
            {/* Large preview */}
            <div className="w-full h-16 rounded-xl mb-4 border border-black/5" style={{ background: hex }} />

            {/* Presets */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => select(c)}
                  className="relative w-8 h-8 rounded-lg border-2 border-transparent hover:scale-110 transition-transform"
                  style={{ background: c, borderColor: hex === c ? "white" : "transparent", boxShadow: hex === c ? `0 0 0 2px ${c}` : "none" }}
                >
                  {hex === c && <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />}
                </button>
              ))}
            </div>

            {/* Custom hex input */}
            <div className="flex items-center gap-2">
              <Pipette className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                value={customHex}
                onChange={(e) => handleCustom(e.target.value)}
                placeholder="#000000"
                className="flex-1 text-sm font-mono border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 31. 21st.dev — Rich Select

```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

interface RichSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}

export function RichSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = true,
}: RichSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    !search || o.label.toLowerCase().includes(search.toLowerCase()) || o.description?.toLowerCase().includes(search.toLowerCase())
  );

  const select = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={ref} className="relative w-72">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 border rounded-xl text-left transition-all ${
          open ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {selected ? (
          <>
            {selected.icon && <span className="text-gray-500">{selected.icon}</span>}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selected.label}</p>
              {selected.description && <p className="text-xs text-gray-400 truncate">{selected.description}</p>}
            </div>
          </>
        ) : (
          <span className="flex-1 text-sm text-gray-400">{placeholder}</span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1.5 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-1.5 text-sm focus:outline-none bg-gray-50 rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto py-1.5">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No options found</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => select(opt)}
                    disabled={opt.disabled}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors ${
                      opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"
                    } ${value === opt.value ? "bg-blue-50" : ""}`}
                  >
                    {opt.icon && <span className="text-gray-500 flex-shrink-0">{opt.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${value === opt.value ? "text-blue-700" : "text-gray-900"}`}>
                        {opt.label}
                      </p>
                      {opt.description && <p className="text-xs text-gray-400 truncate">{opt.description}</p>}
                    </div>
                    {opt.badge && (
                      <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{opt.badge}</span>
                    )}
                    {value === opt.value && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 32. Aceternity — Lens Component

```tsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  hovering?: boolean;
  setHovering?: (v: boolean) => void;
}

export function Lens({
  children,
  zoomFactor = 2,
  lensSize = 120,
}: LensProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const half = lensSize / 2;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}

      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            className="absolute pointer-events-none rounded-full overflow-hidden border-2 border-white/50 shadow-2xl"
            style={{
              width: lensSize,
              height: lensSize,
              top: pos.y - half,
              left: pos.x - half,
            }}
          >
            <div
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
                width: "100%",
                height: "100%",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Demo
export function LensDemo() {
  return (
    <Lens zoomFactor={2.5} lensSize={140}>
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        alt="Mountain"
        className="w-full h-80 object-cover rounded-2xl"
      />
    </Lens>
  );
}
```

---

*End of refero-saas-patterns-2.md*
