import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

// Update this import to your actual SkipLink location if different
import SkipLink from '@/components/SkipLink';

describe('Skip link', () => {
  it('renders with an accessible name and has no axe violations', async () => {
    const { container } = render(<SkipLink />);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
