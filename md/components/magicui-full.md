# MagicUI — Full Component Source Code

> Scraped: 2026-05-28T04:10:49.922Z
> Total: 48

---

## MagicUI: Terminal
> Source: https://magicui.design/docs/components/terminal

```tsx
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/registry/magicui/terminal"
export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>
      <AnimatedSpan className="text-green-500">
        ✔ Preflight checks.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Verifying framework. Found Next.js.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Validating Tailwind CSS.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Validating import alias.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Writing components.json.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Checking registry.
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Updating tailwind.config.ts
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Updating app/globals.css
      </AnimatedSpan>
      <AnimatedSpan className="text-green-500">
        ✔ Installing dependencies.
      </AnimatedSpan>
      <AnimatedSpan className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>
      <TypingAnimation className="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>
      <TypingAnimation className="text-muted-foreground">
        You may now add components.
      </TypingAnimation>
    </Terminal>
  )
}
```

---

## MagicUI: Bento Grid
> Source: https://magicui.design/docs/components/bento-grid
> Dependencies: @radix-ui/react-icons, lucide-react

```tsx
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs"
import AnimatedListDemo from "@/registry/example/animated-list-demo"
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
import { Marquee } from "@/registry/magicui/marquee"
const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
]
const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
]
export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
```

---

## MagicUI: Animated Beam
> Source: https://magicui.design/docs/components/animated-beam

```tsx
"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/registry/magicui/animated-beam"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Icons.openai />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  )
}

const Icons = {
  notion: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
  googleDocs: () => (
    <svg
      width="47px"
      height="65px"
      viewBox="0 0 47 65"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-1"
        />
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-3"
        />
        <linearGradient
          x1="50.0053945%"
          y1="8.58610612%"
          x2="50.0053945%"
          y2="100.013939%"
          id="linearGradient-5"
        >
          <stop stopColor="#1A237E" stopOpacity="0.2" offset="0%" />
          <stop stopColor="#1A237E" stopOpacity="0.02" offset="100%" />
        </linearGradient>
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-6"
        />
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-8"
        />
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-10"
        />
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-12"
        />
        <path
          d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
          id="path-14"
        />
        <radialGradient
          cx="3.16804688%"
          cy="2.71744318%"
          fx="3.16804688%"
          fy="2.71744318%"
          r="161.248516%"
          gradientTransform="translate(0.031680,0.027174),scale(1.000000,0.723077),translate(-0.031680,-0.027174)"
          id="radialGradient-16"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.1" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
        </radialGradient>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g transform="translate(-451.000000, -463.000000)">
          <g id="Hero" transform="translate(0.000000, 63.000000)">
            <g id="Personal" transform="translate(277.000000, 309.000000)">
              <g id="Docs-icon" transform="translate(174.000000, 91.000000)">
                <g id="Group">
                  <g id="Clipped">
                    <mask id="mask-2" fill="white">
                      <use xlinkHref="#path-1" />
                    </mask>
                    <g id="SVGID_1_" />
                    <path
                      d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L36.71875,10.3409091 L29.375,0 Z"
                      id="Path"
                      fill="#4285F4"
                      fillRule="nonzero"
                      mask="url(#mask-2)"
                    />
                  </g>
                  <g id="Clipped">
                    <mask id="mask-4" fill="white">
                      <use xlinkHref="#path-3" />
                    </mask>
                    <g id="SVGID_1_" />
                    <polygon
                      id="Path"
                      fill="url(#linearGradient-5)"
                      fillRule="nonzero"
                      mask="url(#mask-4)"
                      points="30.6638281 16.4309659 47 32.8582386 47 17.7272727"
                    ></polygon>
                  </g>
                  <g id="Clipped">
                    <mask id="mask-7" fill="white">
                      <use xlinkHref="#path-6" />
                    </mask>
                    <g id="SVGID_1_" />
                    <path
                      d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 L11.75,47.2727273 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 L11.75,53.1818182 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 L11.75,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 L11.75,41.3636364 Z"
                      id="Shape"
                      fill="#F1F1F1"
                      fillRule="nonzero"
                      mask="url(#mask-7)"
                    />
                  </g>
                  <g id="Clipped">
                    <mask id="mask-9" fill="white">
                      <use xlinkHref="#path-8" />
                    </mask>
                    <g id="SVGID_1_" />
                    <g id="Group" mask="url(#mask-9)">
                      <g transform="translate(26.437500, -2.954545)">
                        <path
                          d="M2.9375,2.95454545 L2.9375,16.25 C2.9375,18.6985795 4.90929688,20.6818182 7.34375,20.6818182 L20.5625,20.6818182 L2.9375,2.95454545 Z"
                          id="Path"
                          fill="#A1C2FA"
                          fillRule="nonzero"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Clipped">
                    <mask id="mask-11" fill="white">
                      <use xlinkHref="#path-10" />
                    </mask>
                    <g id="SVGID_1_" />
                    <path
                      d="M4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,4.80113636 C0,2.36363636 1.9828125,0.369318182 4.40625,0.369318182 L29.375,0.369318182 L29.375,0 L4.40625,0 Z"
                      id="Path"
                      fillOpacity="0.2"
                      fill="#FFFFFF"
                      fillRule="nonzero"
                      mask="url(#mask-11)"
                    />
                  </g>
                  <g id="Clipped">
                    <mask id="mask-13" fill="white">
                      <use xlinkHref="#path-12" />
                    </mask>
                    <g id="SVGID_1_" />
                    <path
                      d="M42.59375,64.6306818 L4.40625,64.6306818 C1.9828125,64.6306818 0,62.6363636 0,60.1988636 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,60.1988636 C47,62.6363636 45.0171875,64.6306818 42.59375,64.6306818 Z"
                      id="Path"
                      fillOpacity="0.2"
                      fill="#1A237E"
                      fillRule="nonzero"
                      mask="url(#mask-13)"
                    />
                  </g>
                  <g id="Clipped">
                    <mask id="mask-15" fill="white">
                      <use xlinkHref="#path-14" />
                    </mask>
                    <g id="SVGID_1_" />
                    <path
                      d="M33.78125,17.7272727 C31.3467969,17.7272727 29.375,15.7440341 29.375,13.2954545 L29.375,13.6647727 C29.375,16.1133523 31.3467969,18.0965909 33.78125,18.0965909 L47,18.0965909 L47,17.7272727 L33.78125,17.7272727 Z"
                      id="Path"
                      fillOpacity="0.1"
                      fill="#1A237E"
                      fillRule="nonzero"
                      mask="url(#mask-15)"
                    />
                  </g>
                </g>
                <path
                  d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z"
                  id="Path"
                  fill="url(#radialGradient-16)"
                  fillRule="nonzero"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ),
  zapier: () => (
    <svg
      width="105"
      height="28"
      viewBox="0 0 244 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z"
        fill="#201515"
      />
      <path
        d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z"
        fill="#201515"
      />
      <path
        d="M175.035 15.7391H163.75V54.7833H175.035V15.7391Z"
        fill="#201515"
      />
      <path
        d="M241.666 15.7391C238.478 15.7391 235.965 16.864 234.127 19.1139C232.808 20.7307 231.805 23.1197 231.119 26.2809H230.787L229.311 15.7391H219.673V54.7775H230.959V34.7578C230.959 32.2335 231.55 30.2982 232.732 28.9521C233.914 27.606 236.095 26.933 239.275 26.933H243.559V15.7391H241.666Z"
        fill="#201515"
      />
      <path
        d="M208.473 17.0147C205.839 15.4474 202.515 14.6657 198.504 14.6695C192.189 14.6695 187.247 16.4675 183.678 20.0634C180.108 23.6593 178.324 28.6166 178.324 34.9352C178.233 38.7553 179.067 42.5407 180.755 45.9689C182.3 49.0238 184.706 51.5592 187.676 53.2618C190.665 54.9892 194.221 55.8548 198.344 55.8586C201.909 55.8586 204.887 55.3095 207.278 54.2113C209.526 53.225 211.483 51.6791 212.964 49.7211C214.373 47.7991 215.42 45.6359 216.052 43.3377L206.329 40.615C205.919 42.1094 205.131 43.4728 204.041 44.5732C202.942 45.6714 201.102 46.2206 198.521 46.2206C195.451 46.2206 193.163 45.3416 191.657 43.5837C190.564 42.3139 189.878 40.5006 189.575 38.1498H216.201C216.31 37.0515 216.367 36.1306 216.367 35.387V32.9561C216.431 29.6903 215.757 26.4522 214.394 23.4839C213.118 20.7799 211.054 18.5248 208.473 17.0147ZM198.178 23.9758C202.754 23.9758 205.348 26.2275 205.962 30.731H189.775C190.032 29.2284 190.655 27.8121 191.588 26.607C193.072 24.8491 195.268 23.972 198.178 23.9758Z"
        fill="#201515"
      />
      <path
        d="M169.515 0.00366253C168.666 -0.0252113 167.82 0.116874 167.027 0.421484C166.234 0.726094 165.511 1.187 164.899 1.77682C164.297 2.3723 163.824 3.08658 163.512 3.87431C163.2 4.66204 163.055 5.50601 163.086 6.35275C163.056 7.20497 163.201 8.05433 163.514 8.84781C163.826 9.64129 164.299 10.3619 164.902 10.9646C165.505 11.5673 166.226 12.0392 167.02 12.3509C167.814 12.6626 168.663 12.8074 169.515 12.7762C170.362 12.8082 171.206 12.6635 171.994 12.3514C172.782 12.0392 173.496 11.5664 174.091 10.963C174.682 10.3534 175.142 9.63077 175.446 8.83849C175.75 8.04621 175.89 7.20067 175.859 6.35275C175.898 5.50985 175.761 4.66806 175.456 3.88115C175.151 3.09424 174.686 2.37951 174.09 1.78258C173.493 1.18565 172.779 0.719644 171.992 0.414327C171.206 0.109011 170.364 -0.0288946 169.521 0.00938803L169.515 0.00366253Z"
        fill="#201515"
      />
      <path
        d="M146.201 14.6695C142.357 14.6695 139.268 15.8764 136.935 18.2902C135.207 20.0786 133.939 22.7479 133.131 26.2981H132.771L131.295 15.7563H121.657V66H132.942V45.3054H133.354C133.698 46.6852 134.181 48.0267 134.795 49.3093C135.75 51.3986 137.316 53.1496 139.286 54.3314C141.328 55.446 143.629 56.0005 145.955 55.9387C150.68 55.9387 154.277 54.0988 156.748 50.419C159.219 46.7392 160.455 41.6046 160.455 35.0153C160.455 28.6509 159.259 23.6689 156.869 20.0691C154.478 16.4694 150.922 14.6695 146.201 14.6695ZM147.345 42.9602C146.029 44.8668 143.97 45.8201 141.167 45.8201C140.012 45.8735 138.86 45.6507 137.808 45.1703C136.755 44.6898 135.832 43.9656 135.116 43.0574C133.655 41.2233 132.927 38.7122 132.931 35.5243V34.7807C132.931 31.5432 133.659 29.0646 135.116 27.3448C136.572 25.625 138.59 24.7747 141.167 24.7937C144.02 24.7937 146.092 25.6994 147.385 27.5107C148.678 29.322 149.324 31.8483 149.324 35.0896C149.332 38.4414 148.676 41.065 147.356 42.9602H147.345Z"
        fill="#201515"
      />
      <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00" />
    </svg>
  ),
  messenger: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <radialGradient
        id="8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1"
        cx="11.087"
        cy="7.022"
        r="47.612"
        gradientTransform="matrix(1 0 0 -1 0 50)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1292ff"></stop>
        <stop offset=".079" stopColor="#2982ff"></stop>
        <stop offset=".23" stopColor="#4e69ff"></stop>
        <stop offset=".351" stopColor="#6559ff"></stop>
        <stop offset=".428" stopColor="#6d53ff"></stop>
        <stop offset=".754" stopColor="#df47aa"></stop>
        <stop offset=".946" stopColor="#ff6257"></stop>
      </radialGradient>
      <path
        fill="url(#8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1)"
        d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564	c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499	C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"
      />
      <path
        d="M34.992,17.292c-0.428,0-0.843,0.142-1.2,0.411l-5.694,4.215	c-0.133,0.1-0.28,0.15-0.435,0.15c-0.15,0-0.291-0.047-0.41-0.136l-3.972-2.99c-0.808-0.601-1.76-0.918-2.757-0.918	c-1.576,0-3.025,0.791-3.876,2.116l-1.211,1.891l-4.12,6.695c-0.392,0.614-0.422,1.372-0.071,2.014	c0.358,0.654,1.034,1.06,1.764,1.06c0.428,0,0.843-0.142,1.2-0.411l5.694-4.215c0.133-0.1,0.28-0.15,0.435-0.15	c0.15,0,0.291,0.047,0.41,0.136l3.972,2.99c0.809,0.602,1.76,0.918,2.757,0.918c1.576,0,3.025-0.791,3.876-2.116l1.211-1.891	l4.12-6.695c0.392-0.614,0.422-1.372,0.071-2.014C36.398,17.698,35.722,17.292,34.992,17.292L34.992,17.292z"
        opacity=".05"
      />
      <path
        d="M34.992,17.792c-0.319,0-0.63,0.107-0.899,0.31l-5.697,4.218	c-0.216,0.163-0.468,0.248-0.732,0.248c-0.259,0-0.504-0.082-0.71-0.236l-3.973-2.991c-0.719-0.535-1.568-0.817-2.457-0.817	c-1.405,0-2.696,0.705-3.455,1.887l-1.21,1.891l-4.115,6.688c-0.297,0.465-0.32,1.033-0.058,1.511c0.266,0.486,0.787,0.8,1.325,0.8	c0.319,0,0.63-0.107,0.899-0.31l5.697-4.218c0.216-0.163,0.468-0.248,0.732-0.248c0.259,0,0.504,0.082,0.71,0.236l3.973,2.991	c0.719,0.535,1.568,0.817,2.457,0.817c1.405,0,2.696-0.705,3.455-1.887l1.21-1.891l4.115-6.688c0.297-0.465,0.32-1.033,0.058-1.511	C36.051,18.106,35.531,17.792,34.992,17.792L34.992,17.792z"
        opacity=".07"
      />
      <path
        fill="#ffffff"
        d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74	c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01	l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}
```

---

## MagicUI: Border Beam
> Source: https://magicui.design/docs/components/border-beam
> Dependencies: lucide-react

```tsx
import { Play, SkipBack, SkipForward } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BorderBeam } from "@/registry/magicui/border-beam"

export function MusicPlayer() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
        <CardDescription>Stairway to Heaven - Led Zeppelin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-48 rounded-lg bg-linear-to-br from-purple-500 to-pink-500" />
          <div className="bg-secondary h-1 w-full rounded-full">
            <div className="bg-primary h-full w-1/3 rounded-full" />
          </div>
          <div className="text-muted-foreground flex w-full justify-between text-sm">
            <span>2:45</span>
            <span>8:02</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipBack className="size-4" />
        </Button>
        <Button size="icon" className="rounded-full">
          <Play className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipForward className="size-4" />
        </Button>
      </CardFooter>
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />
    </Card>
  )
}
```

---

## MagicUI: Magic Card
> Source: https://magicui.design/docs/components/magic-card
> Dependencies: next/link, next-themes

```tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AvatarCircles } from "@/registry/magicui/avatar-circles"
import { MagicCard } from "@/registry/magicui/magic-card"

export function MagicCardDemo() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true

  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard
        mode="orb"
        glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
        glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
          <div className="flex items-center gap-3">
            <AvatarCircles
              avatarUrls={[
                {
                  imageUrl: "https://avatars.githubusercontent.com/u/81306489",
                  profileUrl: "https://github.com/Yeom-JinHo",
                },
              ]}
            />
            <div className="flex-1">
              <CardTitle>Yeom JinHo</CardTitle>
              <CardDescription className="mt-1">
                Frontend Developer
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-medium">
            Frontend Developer focused on Interactive UI &amp; Performance
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I&apos;m passionate about visual presentation and currently focusing
            on interactive UI.
          </p>
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <Button asChild className="w-full">
            <Link
              href="https://github.com/Yeom-JinHo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 438.549 438.549" className="size-4">
                <path
                  fill="currentColor"
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                ></path>
              </svg>
              View on GitHub
            </Link>
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  )
}
```

---

## MagicUI: Glare Hover
> Source: https://magicui.design/docs/components/glare-hover

```tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"
export function PricingCard() {
  return (
    <GlareHover className="rounded-xl" duration={600}>
      <Card className="w-[340px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pro</CardTitle>
            <Badge>Popular</Badge>
          </div>
          <CardDescription>For teams that need more.</CardDescription>
          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-4xl font-semibold tracking-tight">$49</span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5">
          {[
            "Unlimited projects",
            "Team collaboration",
            "Advanced analytics",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M12.5 3.5L6 10L2.5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {f}
            </div>
          ))}
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle
                cx="7.5"
                cy="7.5"
                r="1.5"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
            SSO (coming soon)
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get started</Button>
        </CardFooter>
      </Card>
    </GlareHover>
  )
}
```

---

## MagicUI: Theme Toggler
> Source: https://magicui.design/docs/components/animated-theme-toggler

```tsx
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler"

export function AnimatedThemeTogglerRectangleDemo() {
  return (
    <div className="flex justify-center p-6">
      <AnimatedThemeToggler variant="rectangle" />
    </div>
  )
}
```

---

## MagicUI: Text Animate
> Source: https://magicui.design/docs/components/text-animate

```tsx
"use client"

import { TextAnimate } from "@/registry/magicui/text-animate"

export function TextAnimateDemo9() {
  return (
    <TextAnimate
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          rotate: 45,
          scale: 0.5,
        },
        show: (i) => ({
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          transition: {
            delay: i * 0.1,
            duration: 0.4,
            y: {
              type: "spring",
              damping: 12,
              stiffness: 200,
              mass: 0.8,
            },
            rotate: {
              type: "spring",
              damping: 8,
              stiffness: 150,
            },
            scale: {
              type: "spring",
              damping: 10,
              stiffness: 300,
            },
          },
        }),
        exit: (i) => ({
          opacity: 0,
          y: 30,
          rotate: 45,
          scale: 0.5,
          transition: {
            delay: i * 0.1,
            duration: 0.4,
          },
        }),
      }}
      by="character"
    >
      Wavy Motion!
    </TextAnimate>
  )
}
```

---

## MagicUI: Typing Animation
> Source: https://magicui.design/docs/components/typing-animation

```tsx
import { TypingAnimation } from "@/registry/magicui/typing-animation"

export function Component() {
  return (
    <div className="flex-1 space-y-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          Line cursor (default)
        </p>
        <TypingAnimation
          words={["Line cursor"]}
          cursorStyle="line"
          loop
          className="text-4xl font-bold"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          Block cursor (VSCode style)
        </p>
        <TypingAnimation
          words={["Block cursor"]}
          cursorStyle="block"
          loop
          className="text-4xl font-bold"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Underscore cursor</p>
        <TypingAnimation
          words={["Underscore cursor"]}
          cursorStyle="underscore"
          loop
          className="text-4xl font-bold"
        />
      </div>
    </div>
  )
}
```

---

## MagicUI: Line Shadow Text
> Source: https://magicui.design/docs/components/line-shadow-text
> Dependencies: next-themes

```tsx
"use client"
import { useTheme } from "next-themes"
import { LineShadowText } from "@/registry/magicui/line-shadow-text"
export function LineShadowTextDemo() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"
  return (
    <h1 className="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      Ship
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Fast
      </LineShadowText>
    </h1>
  )
}
```

---

## MagicUI: Aurora Text
> Source: https://magicui.design/docs/components/aurora-text

```tsx
import { AuroraText } from "@/registry/magicui/aurora-text"
export function AuroraTextDemo() {
  return (
    <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
      Ship <AuroraText>beautiful</AuroraText>
    </h1>
  )
}
```

---

## MagicUI: Number Ticker
> Source: https://magicui.design/docs/components/number-ticker

```tsx
import { NumberTicker } from "@/registry/magicui/number-ticker"

export function NumberTickerDemo() {
  return (
    <NumberTicker
      value={5.67}
      decimalPlaces={2}
      className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
    />
  )
}
```

---

## MagicUI: Animated Gradient Text
> Source: https://magicui.design/docs/components/animated-gradient-text
> Dependencies: lucide-react

```tsx
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedGradientText } from "@/registry/magicui/animated-gradient-text"
export function AnimatedGradientTextDemo() {
  return (
    <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">
        Introducing Magic UI
      </AnimatedGradientText>
      <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  )
}
```

---

## MagicUI: Text Reveal
> Source: https://magicui.design/docs/components/text-reveal

```tsx
import { TextReveal } from "@/registry/magicui/text-reveal"
export function TextRevealDemo() {
  return <TextReveal>Magic UI will change the way you design.</TextReveal>
}
```

---

## MagicUI: Dia Text Reveal
> Source: https://magicui.design/docs/components/dia-text-reveal

```tsx
import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"

export function DiaTextRevealDemo3() {
  return (
    <div className="text-foreground flex min-h-64 items-center justify-center p-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
        Learn to{" "}
        <DiaTextReveal
          repeat
          repeatDelay={1.2}
          text={["build faster", "ship smarter", "scale easier"]}
        />
      </h1>
    </div>
  )
}
```

---

## MagicUI: Hyper Text
> Source: https://magicui.design/docs/components/hyper-text

```tsx
import { HyperText } from "@/registry/magicui/hyper-text"
export function HyperTextDemo() {
  return <HyperText>Hover Me!</HyperText>
}
```

---

## MagicUI: Word Rotate
> Source: https://magicui.design/docs/components/word-rotate

```tsx
import { WordRotate } from "@/registry/magicui/word-rotate"
export function WordRotateDemo() {
  return (
    <WordRotate
      className="text-4xl font-bold text-black dark:text-white"
      words={["Word", "Rotate"]}
    />
  )
}
```

---

## MagicUI: Scroll Based Velocity
> Source: https://magicui.design/docs/components/scroll-based-velocity

```tsx
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magicui/scroll-based-velocity"

const IMAGES_ROW_A = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const IMAGES_ROW_B = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export function ScrollBasedVelocityImagesDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
          {IMAGES_ROW_A.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
          {IMAGES_ROW_B.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
```

---

## MagicUI: Sparkles Text
> Source: https://magicui.design/docs/components/sparkles-text

```tsx
import { SparklesText } from "@/registry/magicui/sparkles-text"
export function SparklesTextDemo() {
  return <SparklesText>Magic UI</SparklesText>
}
```

---

## MagicUI: Morphing Text
> Source: https://magicui.design/docs/components/morphing-text

```tsx
import { MorphingText } from "@/registry/magicui/morphing-text"
const texts = [
  "Hello",
  "Morphing",
  "Text",
  "Animation",
  "React",
  "Component",
  "Smooth",
  "Transition",
  "Engaging",
]
export function MorphingTextDemo() {
  return <MorphingText texts={texts} />
}
```

---

## MagicUI: Spinning Text
> Source: https://magicui.design/docs/components/spinning-text

```tsx
import { SpinningText } from "@/registry/magicui/spinning-text"

export function SpinningTextBasic() {
  return (
    <SpinningText reverse className="text-4xl" duration={4} radius={6}>
      learn more • earn more • grow more •
    </SpinningText>
  )
}
```

---

## MagicUI: Text 3D Flip
> Source: https://magicui.design/docs/components/text-3d-flip

```tsx
import Text3DFlip from "@/registry/magicui/text-3d-flip"
export function Text3DFlipDemo() {
  return (
    <Text3DFlip
      className="bg-background font-serif text-2xl sm:text-5xl md:text-[56px]"
      textClassName="bg-background text-foreground"
      flipTextClassName="bg-background text-foreground"
      rotateDirection="top"
      staggerDuration={0.03}
      staggerFrom="first"
      transition={{ type: "spring", damping: 25, stiffness: 160 }}
    >
      Stay hungry, stay foolish
    </Text3DFlip>
  )
}
```

---

## MagicUI: Safari
> Source: https://magicui.design/docs/components/safari

```tsx
import { Safari } from "@/registry/magicui/safari"

export function SafariDemo() {
  return (
    <div className="w-[1203px]">
      <Safari
        url="magicui.design"
        videoSrc="https://videos.pexels.com/video-files/27180348/12091515_2560_1440_50fps.mp4"
      />
    </div>
  )
}
```

---

## MagicUI: iPhone
> Source: https://magicui.design/docs/components/iphone

```tsx
import { Iphone } from "@/registry/magicui/iphone"

export function Demo() {
  return (
    <div className="w-[434px]">
      <Iphone videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4" />
    </div>
  )
}
```

---

## MagicUI: Android
> Source: https://magicui.design/docs/components/android

```tsx
import { Android } from "@/registry/magicui/android"

export function AndroidDemo() {
  return (
    <div className="relative">
      <Android
        className="size-full"
        src="https://images.unsplash.com/photo-1730326405863-c6fa7e499a6e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  )
}
```

---

## MagicUI: Rainbow Button
> Source: https://magicui.design/docs/components/rainbow-button

```tsx
import { RainbowButton } from "@/registry/magicui/rainbow-button"

export function RainbowButtonDemo() {
  return <RainbowButton variant="outline">Get Unlimited Access</RainbowButton>
}
```

---

## MagicUI: Shimmer Button
> Source: https://magicui.design/docs/components/shimmer-button

```tsx
import { ShimmerButton } from "@/registry/magicui/shimmer-button"
export function ShimmerButtonDemo() {
  return (
    <ShimmerButton className="shadow-2xl">
      <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
        Shimmer Button
      </span>
    </ShimmerButton>
  )
}
```

---

## MagicUI: Ripple Button
> Source: https://magicui.design/docs/components/ripple-button

```tsx
import { RippleButton } from "@/registry/magicui/ripple-button"
export function RippleButtonDemo() {
  return <RippleButton rippleColor="#ADD8E6">Click me</RippleButton>
}
```

---

## MagicUI: Flickering Grid
> Source: https://magicui.design/docs/components/flickering-grid

```tsx
import { FlickeringGrid } from "@/registry/magicui/flickering-grid"

export function FlickeringGridRoundedDemo() {
  return (
    <div className="bg-background relative size-[600px] w-full overflow-hidden rounded-lg border">
      <FlickeringGrid
        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    </div>
  )
}
```

---

## MagicUI: Animated Grid Pattern
> Source: https://magicui.design/docs/components/animated-grid-pattern

```tsx
import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/registry/magicui/animated-grid-pattern"
export function AnimatedGridPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-20">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  )
}
```

---

## MagicUI: Retro Grid
> Source: https://magicui.design/docs/components/retro-grid

```tsx
"use client"
import { RetroGrid } from "@/registry/magicui/retro-grid"
export function RetroGridDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent">
        Retro Grid
      </span>
      <RetroGrid />
    </div>
  )
}
```

---

## MagicUI: Ripple
> Source: https://magicui.design/docs/components/ripple

```tsx
import { Ripple } from "@/registry/magicui/ripple"
export function RippleDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white">
        Ripple
      </p>
      <Ripple />
    </div>
  )
}
```

---

## MagicUI: Dot Pattern
> Source: https://magicui.design/docs/components/dot-pattern

```tsx
"use client"

import { cn } from "@/lib/utils"
import { DotPattern } from "@/registry/magicui/dot-pattern"

export function DotPatternLinearGradient() {
  return (
    <div className="bg-background relative flex size-full items-center justify-center overflow-hidden rounded-lg border p-20">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
    </div>
  )
}
```

---

## MagicUI: Grid Pattern
> Source: https://magicui.design/docs/components/grid-pattern

```tsx
"use client"
import { cn } from "@/lib/utils"
import { GridPattern } from "@/registry/magicui/grid-pattern"
export function GridPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </div>
  )
}
```

---

## MagicUI: Hexagon Pattern
> Source: https://magicui.design/docs/components/hexagon-pattern

```tsx
"use client"
import { cn } from "@/lib/utils"
import { HexagonPattern } from "@/registry/magicui/hexagon-pattern"
export function HexagonPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <HexagonPattern
        hexagons={[
          [1, 1],
          [4, 4],
          [2, 2],
          [3, 4],
          [5, 4],
          [8, 2],
          [6, 3],
          [8, 5],
          [10, 10],
        ]}
        className={cn(
          "mask-[radial-gradient(420px_circle_at_center,white,transparent)]",
          "inset-0 skew-y-6"
        )}
      />
    </div>
  )
}
```

---

## MagicUI: Striped Pattern
> Source: https://magicui.design/docs/components/striped-pattern

```tsx
import { StripedPattern } from "@/registry/magicui/striped-pattern"
export function StripedPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
    </div>
  )
}
```

---

## MagicUI: Interactive Grid Pattern
> Source: https://magicui.design/docs/components/interactive-grid-pattern

```tsx
"use client"

import { cn } from "@/lib/utils"
import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern"

export function InteractiveGridPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
    </div>
  )
}
```

---

## MagicUI: Light Rays
> Source: https://magicui.design/docs/components/light-rays

```tsx
import { LightRays } from "@/registry/magicui/light-rays"
export function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-[0.35em] text-slate-800/60 uppercase dark:text-slate-200/60">
          Ambient glow
        </span>
        <h1 className="text-foreground text-4xl font-bold md:text-5xl">
          Light Rays
        </h1>
        <p className="max-w-md text-sm text-slate-800/80 md:text-base dark:text-slate-200/80">
          Drop this component into any container and it will fill the space with
          softly animated light rays shining from above.
        </p>
      </div>
      <LightRays />
    </div>
  )
}
```

---

## MagicUI: Noise Texture
> Source: https://magicui.design/docs/components/noise-texture

```tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NoiseTexture } from "@/registry/magicui/noise-texture"

export function NoiseTextureDemo2() {
  return (
    <div className="flex justify-center p-4">
      <Card className="bg-card/80 relative w-full max-w-md overflow-hidden border">
        <NoiseTexture noiseOpacity={0.45} />
        <CardHeader className="relative z-10 space-y-1 pb-4">
          <CardTitle className="text-xl">The weekly digest</CardTitle>
          <CardDescription>
            One email on Sundays—new components, tips, and changelog highlights.
            No spam, unsubscribe anytime.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              autoComplete="email"
              placeholder="you@company.com"
              type="email"
            />
          </div>
          <Button className="w-full" type="button">
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## MagicUI: Shiny Button
> Source: https://magicui.design/docs/components/shiny-button

```tsx
import { ShinyButton } from "@/registry/magicui/shiny-button"
export function ShinyButtonDemo() {
  return <ShinyButton>Shiny Button</ShinyButton>
}
```

---

## MagicUI: File Tree
> Source: https://magicui.design/docs/components/file-tree

```tsx
import { Tree } from "@/registry/magicui/file-tree"
import type { TreeViewElement } from "@/registry/magicui/file-tree"
export function FileTreeDemo() {
  return (
    <div className="bg-background relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Tree
        className="bg-background overflow-hidden rounded-md p-2"
        initialSelectedId="button"
        initialExpandedItems={["src", "app", "components", "ui", "lib"]}
        elements={ELEMENTS}
      />
    </div>
  )
}
const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "lib",
        type: "folder",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "utils",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
      {
        id: "app",
        type: "folder",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "page",
            isSelectable: true,
            name: "page.tsx",
          },
          {
            id: "layout",
            isSelectable: true,
            name: "layout.tsx",
          },
        ],
      },
      {
        id: "components",
        type: "folder",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "header",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "ui",
            type: "folder",
            isSelectable: true,
            name: "ui",
            children: [
              {
                id: "button",
                isSelectable: true,
                name: "button.tsx",
              },
            ],
          },
          {
            id: "footer",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
    ],
  },
]
```

---

## MagicUI: Code Comparison
> Source: https://magicui.design/docs/components/code-comparison

```tsx
import { CodeComparison } from "@/registry/magicui/code-comparison"
const beforeCode = `import { NextRequest } from 'next/server';
export const middleware = async (req: NextRequest) => {
  let user = undefined;
  let team = undefined;
  const token = req.headers.get('token'); 
  if(req.nextUrl.pathname.startsWith('/auth')) {
    user = await getUserByToken(token);
    if(!user) {
      return NextResponse.redirect('/login');
    }
  }
  if(req.nextUrl.pathname.startsWith('/team')) {
    user = await getUserByToken(token);
    if(!user) {
      return NextResponse.redirect('/login');
    }
    const slug = req.nextUrl.query.slug;
    team = await getTeamBySlug(slug); // [!code highlight]
    if(!team) { // [!code highlight]
      return NextResponse.redirect('/'); // [!code highlight]
    } // [!code highlight]
  } // [!code highlight]
  return NextResponse.next(); // [!code highlight]
}
export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'], // [!code highlight]
};`
const afterCode = `import { createMiddleware, type MiddlewareFunctionProps } from '@app/(auth)/auth/_middleware';
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code --]
import { auth } from '@/app/(auth)/auth/_middleware'; // [!code ++]
import { team } from '@/app/(team)/team/_middleware';
const middlewares = {
  '/auth{/:path?}': auth,
  '/team{/:slug?}': [ auth, team ],
};
export const middleware = createMiddleware(middlewares); // [!code focus]
export const config = {
  matcher: ['/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)'],
};`
export function CodeComparisonDemo() {
  return (
    <CodeComparison
      beforeCode={beforeCode}
      afterCode={afterCode}
      language="typescript"
      filename="middleware.ts"
      lightTheme="github-light"
      darkTheme="github-dark"
      highlightColor="rgba(101, 117, 133, 0.16)"
    />
  )
}
```

---

## MagicUI: Scroll Progress
> Source: https://magicui.design/docs/components/scroll-progress

```tsx
import { ScrollProgress } from "@/registry/magicui/scroll-progress"
export function ScrollProgressDemo() {
  return (
    <div className="z-10 rounded-lg p-4">
      <ScrollProgress className="top-[65px]" />
      <h2 className="pb-4 font-bold">
        Note: The scroll progress is shown below the navbar of the page.
      </h2>
    </div>
  )
}
```

---

## MagicUI: Neon Gradient Card
> Source: https://magicui.design/docs/components/neon-gradient-card

```tsx
import { NeonGradientCard } from "@/registry/magicui/neon-gradient-card"
export function NeonGradientCardDemo() {
  return (
    <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full bg-linear-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Neon Gradient Card
      </span>
    </NeonGradientCard>
  )
}
```

---

## MagicUI: Comic Text
> Source: https://magicui.design/docs/components/comic-text

```tsx
import { ComicText } from "@/registry/magicui/comic-text"
export function ComicTextDemo() {
  return (
    <div className="space-y-8 text-center">
      <ComicText fontSize={5}>BOOM!</ComicText>
    </div>
  )
}
```

---

## MagicUI: Kinetic Text
> Source: https://magicui.design/docs/components/kinetic-text

```tsx
import { KineticText } from "@/registry/magicui/kinetic-text"
export function KineticTextDemo() {
  return (
    <div className="relative justify-center">
      <KineticText
        text="Nostalgia"
        className="text-[6rem] tracking-[-5%] [font-optical-sizing:auto]"
      />
    </div>
  )
}
```

---

## MagicUI: Pulsating Button
> Source: https://magicui.design/docs/components/pulsating-button

```tsx
import { PulsatingButton } from "@/registry/magicui/pulsating-button"

export function PulsatingButtonDemo2() {
  return (
    <PulsatingButton
      variant="ripple"
      distance="10px"
      className="bg-blue-400 text-white"
    >
      Join Affiliate Program
    </PulsatingButton>
  )
}
```

---

## MagicUI: Animated Circular Progress Bar
> Source: https://magicui.design/docs/components/animated-circular-progress-bar

```tsx
"use client"
import { useEffect, useState } from "react"
import { AnimatedCircularProgressBar } from "@/registry/magicui/animated-circular-progress-bar"
export function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0
      }
      return prev + 10
    }
    setValue(handleIncrement)
    const interval = setInterval(() => setValue(handleIncrement), 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <AnimatedCircularProgressBar
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  )
}
```

---

## Skipped
- **Marquee**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/marquee", waiting until "networkidle"[22m

- **Hero Video Dialog**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/hero-video-dialog", waiting until "networkidle"[22m

- **Animated List**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/animated-list", waiting until "networkidle"[22m

- **Dock**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/dock", waiting until "networkidle"[22m

- **Globe**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/globe", waiting until "networkidle"[22m

- **Tweet Card**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/tweet-card", waiting until "networkidle"[22m

- **Orbiting Circles**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/orbiting-circles", waiting until "networkidle"[22m

- **Avatar Circles**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/avatar-circles", waiting until "networkidle"[22m

- **Icon Cloud**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/icon-cloud", waiting until "networkidle"[22m

- **Lens**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/lens", waiting until "networkidle"[22m

- **Pointer**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/pointer", waiting until "networkidle"[22m

- **Smooth Cursor**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/smooth-cursor", waiting until "networkidle"[22m

- **Progressive Blur**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/progressive-blur", waiting until "networkidle"[22m

- **Dotted Map**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/dotted-map", waiting until "networkidle"[22m

- **Shine Border**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/shine-border", waiting until "networkidle"[22m

- **Meteors**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/meteors", waiting until "networkidle"[22m

- **Confetti**: page.goto: net::ERR_NETWORK_CHANGED at https://magicui.design/docs/components/confetti
Call log:
[2m  - navigating to "https://magicui.design/docs/components/confetti", waiting until "networkidle"[22m

- **Particles**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/particles", waiting until "networkidle"[22m

- **Blur Fade**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/blur-fade", waiting until "networkidle"[22m

- **Video Text**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/video-text", waiting until "networkidle"[22m

- **Animated Shiny Text**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/animated-shiny-text", waiting until "networkidle"[22m

- **Text Highlighter**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/highlighter", waiting until "networkidle"[22m

- **Cool Mode**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/cool-mode", waiting until "networkidle"[22m

- **Pixel Image**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/pixel-image", waiting until "networkidle"[22m

- **Warp Background**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/warp-background", waiting until "networkidle"[22m

- **Interactive Hover Button**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/interactive-hover-button", waiting until "networkidle"[22m

- **Backlight**: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "https://magicui.design/docs/components/backlight", waiting until "networkidle"[22m

