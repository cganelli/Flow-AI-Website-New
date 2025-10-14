import '@testing-library/jest-dom/vitest';
import React from 'react';
import { expect, vi } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// Note: fetchPriority warnings in tests are harmless
// They occur because jsdom doesn't recognize the fetchPriority prop on <img> elements
// This is expected behavior and doesn't affect test functionality
// To run tests without warnings, use: npx vitest run 2>/dev/null

// Render next/link as <a>
vi.mock('next/link', () => ({
  default: (props: any) => React.createElement('a', props)
}));

// Render next/image as <img>
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fetchPriority, ...restProps } = props;
    return React.createElement('img', restProps);
  }
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
