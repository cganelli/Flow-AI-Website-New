import '@testing-library/jest-dom/vitest';
import React from 'react';
import { expect, vi } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// Render next/link as <a>
vi.mock('next/link', () => ({
  default: (props: any) => React.createElement('a', props)
}));

// Render next/image as <img>
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props)
}));

// Soft stubs for navigation (if imported)
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: () => {}, replace: () => {}, prefetch: () => {} }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/'
}));

// Prevent heavy side-effects from email form during tests
vi.mock('@/components/EmailJsFormBridge', () => ({
  __esModule: true,
  default: () => null
}));
