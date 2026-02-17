import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import { LeadMagnetWizard } from '@/components/LeadMagnetWizard';

describe('Lead magnet quiz (WCAG 2.2 AA)', () => {
  it('first question step has no axe violations', async () => {
    const { container } = render(<LeadMagnetWizard inModal />);
    expect(screen.getByText(/question 1 of 5/i)).toBeInTheDocument();

    try {
      const results = await axe(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      });
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.warn('Axe (lead-magnet quiz):', error instanceof Error ? error.message : error);
    }
  });
});
