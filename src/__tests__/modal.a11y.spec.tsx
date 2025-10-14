import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

// Update this import to your actual modal component
import { AuditModal } from '@/components/AuditModal';

describe('Audit modal', () => {
  it('uses dialog semantics and has no axe violations when open', async () => {
    const { container } = render(<AuditModal open onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: /book your free ai audit/i })).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
