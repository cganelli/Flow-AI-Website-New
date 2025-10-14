import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

// Next.js App Router default export for home is usually here:
import HomePage from '@/app/page';

describe('Home page', () => {
  it('has no obvious axe violations in static render', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
