# Testing — Vitest + Playwright + React Testing Library

---

## Vitest Config for Next.js

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        '**/*.config.*',
        '**/types/**',
        '**/__mocks__/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
```

```ts
// vitest.setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock next/image globally
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />,
}));

// Mock next/font
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-font' }),
}));
```

---

## React Testing Library — Common Patterns

```tsx
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading text accessibly', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

// Prefer queries by priority:
// 1. getByRole         — best, matches AT semantics
// 2. getByLabelText    — for form fields
// 3. getByPlaceholderText
// 4. getByText         — visible text
// 5. getByDisplayValue — form values
// 6. getByAltText      — images
// 7. getByTitle
// 8. getByTestId       — last resort
```

---

## Testing Custom Hooks

```tsx
// hooks/useCounter.ts
import { useState, useCallback } from 'react';

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);
  return { count, increment, decrement, reset };
}

// __tests__/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('increments the count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('decrements the count', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(4);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => { result.current.increment(); result.current.increment(); });
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });
});

// Async hook example
// __tests__/useFetch.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useFetch } from '@/hooks/useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns data on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'Alice' }),
    } as Response);

    const { result } = renderHook(() => useFetch('/api/user/1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({ id: 1, name: 'Alice' });
    expect(result.current.error).toBeNull();
  });

  it('returns error on failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFetch('/api/user/1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/network error/i);
    expect(result.current.data).toBeNull();
  });
});
```

---

## Testing Server Components (Async Components)

```tsx
// app/users/[id]/page.tsx — Server Component
import { notFound } from 'next/navigation';

async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) notFound();
  return <h1>{user.name}</h1>;
}

// __tests__/UserPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserPage from '@/app/users/[id]/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND'); }),
  redirect: vi.fn(),
}));

describe('UserPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders user name', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '1', name: 'Alice Smith' }),
    } as Response);

    // Server components are async — await them directly
    const Component = await UserPage({ params: { id: '1' } });
    render(Component);
    expect(screen.getByRole('heading', { name: /alice smith/i })).toBeInTheDocument();
  });

  it('calls notFound when user does not exist', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false } as Response);
    const { notFound } = await import('next/navigation');

    await expect(UserPage({ params: { id: '999' } })).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
```

---

## Mocking Supabase in Tests

```ts
// __mocks__/@supabase/supabase-js.ts
import { vi } from 'vitest';

const mockSelect = vi.fn().mockReturnThis();
const mockInsert = vi.fn().mockReturnThis();
const mockUpdate = vi.fn().mockReturnThis();
const mockDelete = vi.fn().mockReturnThis();
const mockEq = vi.fn().mockReturnThis();
const mockSingle = vi.fn();
const mockFrom = vi.fn(() => ({
  select: mockSelect,
  insert: mockInsert,
  update: mockUpdate,
  delete: mockDelete,
  eq: mockEq,
  single: mockSingle,
}));

export const createClient = vi.fn(() => ({
  from: mockFrom,
  auth: {
    getUser: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
  },
  storage: {
    from: vi.fn(() => ({
      upload: vi.fn(),
      download: vi.fn(),
      getPublicUrl: vi.fn(() => ({ data: { publicUrl: 'https://example.com/file.jpg' } })),
    })),
  },
}));

export { mockFrom, mockSelect, mockInsert, mockUpdate, mockDelete, mockEq, mockSingle };

// __tests__/UserService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockFrom, mockSingle } from '@/__mocks__/@supabase/supabase-js';
import { getUser } from '@/services/userService';

vi.mock('@supabase/supabase-js');

describe('getUser', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns user data on success', async () => {
    mockSingle.mockResolvedValue({
      data: { id: '1', email: 'alice@example.com' },
      error: null,
    });

    const result = await getUser('1');
    expect(result).toEqual({ id: '1', email: 'alice@example.com' });
    expect(mockFrom).toHaveBeenCalledWith('users');
  });

  it('throws on error', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'Not found' },
    });

    await expect(getUser('999')).rejects.toThrow('Not found');
  });
});
```

---

## Mocking next/navigation

```tsx
// vitest.setup.ts — or per-file
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/'),
  useParams: vi.fn(() => ({})),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

// Per-test override
import { useRouter } from 'next/navigation';

it('navigates to dashboard on submit', async () => {
  const push = vi.fn();
  vi.mocked(useRouter).mockReturnValue({ push, replace: vi.fn(), back: vi.fn(),
    forward: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() });

  const user = userEvent.setup();
  render(<LoginForm />);
  await user.click(screen.getByRole('button', { name: /sign in/i }));
  expect(push).toHaveBeenCalledWith('/dashboard');
});

// Mocking useSearchParams with values
import { useSearchParams } from 'next/navigation';

it('reads query param', () => {
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams({ tab: 'settings', page: '2' }) as ReturnType<typeof useSearchParams>
  );
  render(<TabbedPage />);
  expect(screen.getByRole('tab', { name: /settings/i })).toHaveAttribute('aria-selected', 'true');
});
```

---

## Playwright E2E Setup

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps
```

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    // Auth setup project
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'no-auth',
      testMatch: /.*\.noauth\.spec\.ts/,
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

---

## Playwright Auth State Reuse (storageState)

```ts
// e2e/global.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole('button', { name: /sign in/i }).click();

  // Wait for redirect to dashboard
  await page.waitForURL('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

  // Save storage state for all tests
  await page.context().storageState({ path: authFile });
});

// e2e/dashboard.spec.ts — uses saved auth
import { test, expect } from '@playwright/test';

test('shows user data on dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  // Already authenticated via storageState
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
```

---

## Page Object Model for E2E

```ts
// e2e/pages/LoginPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: /sign in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginAndWait(email: string, password: string, redirectPath = '/dashboard') {
    await this.login(email, password);
    await this.page.waitForURL(redirectPath);
  }

  async expectError(message: string | RegExp) {
    await expect(this.errorMessage).toContainText(message);
  }
}

// e2e/pages/DashboardPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly userMenu: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /dashboard/i });
    this.userMenu = page.getByRole('button', { name: /user menu/i });
    this.signOutButton = page.getByRole('menuitem', { name: /sign out/i });
  }

  async goto() {
    await this.page.goto('/dashboard');
    await expect(this.heading).toBeVisible();
  }

  async signOut() {
    await this.userMenu.click();
    await this.signOutButton.click();
    await this.page.waitForURL('/login');
  }
}

// e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Login flow', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.loginAndWait('user@example.com', 'password123');
    await expect(dashboardPage.heading).toBeVisible();
  });

  test('invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@example.com', 'badpass');
    await loginPage.expectError(/invalid credentials/i);
  });
});
```

---

## Visual Regression Testing with Playwright Screenshots

```ts
// playwright.config.ts — add snapshot settings
// updateSnapshots: 'missing' | 'all' | 'none'
// snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}'

// e2e/visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual regression', () => {
  test('homepage matches snapshot', async ({ page }) => {
    await page.goto('/');
    // Wait for fonts and images
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
      mask: [
        page.locator('[data-testid="timestamp"]'),   // mask dynamic content
        page.locator('[data-testid="avatar"]'),
      ],
    });
  });

  test('button states match snapshots', async ({ page }) => {
    await page.goto('/design-system/buttons');

    const buttonGroup = page.getByTestId('button-group');
    await expect(buttonGroup).toHaveScreenshot('buttons-default.png');

    // Hover state
    await page.getByRole('button', { name: /primary/i }).hover();
    await expect(buttonGroup).toHaveScreenshot('buttons-hover.png');
  });

  test('mobile layout matches snapshot', async ({ page, viewport }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png', { fullPage: true });
  });
});

// Update snapshots: npx playwright test --update-snapshots
// Run visual tests only: npx playwright test visual.spec.ts
```

---

## GitHub Actions Test Pipeline

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    name: Unit Tests (Vitest)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run unit tests with coverage
        run: npm run test:coverage

      - name: Upload coverage report
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
          fail_ci_if_error: true

  e2e-tests:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    needs: unit-tests
    env:
      BASE_URL: http://localhost:3000
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium firefox

      - name: Build Next.js
        run: npm run build

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

```json
// package.json — test scripts
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

---

## Test Coverage Reporting

```ts
// vitest.config.ts — complete coverage config
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',         // or 'istanbul'
      reporter: [
        'text',               // terminal output
        'text-summary',       // compact terminal summary
        'html',               // browse at coverage/index.html
        'lcov',               // for Codecov / Coveralls
        'json',               // for other tools
        'json-summary',       // for PR comments
      ],
      reportsDirectory: './coverage',
      include: ['**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        '.next/**',
        'coverage/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types/**',
        '**/__mocks__/**',
        '**/e2e/**',
        'vitest.setup.ts',
      ],
      thresholds: {
        global: {
          lines: 80,
          functions: 80,
          branches: 75,
          statements: 80,
        },
        // Per-file thresholds for critical modules
        'lib/auth.ts': {
          lines: 95,
          functions: 95,
        },
      },
    },
  },
});

// View report
// npm run test:coverage && open coverage/index.html
```
