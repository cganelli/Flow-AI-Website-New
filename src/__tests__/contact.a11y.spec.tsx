import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import ContactPage from '@/app/contact/page'; // adjust path if different

describe('Contact page', () => {
  it('inputs are labeled and no axe violations', async () => {
    const { container } = render(<ContactPage />);
    // Adjust these to whatever your actual labels are:
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
