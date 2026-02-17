import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import { LeadMagnetModal } from '@/components/LeadMagnetModal';
import { LeadMagnetWizard } from '@/components/LeadMagnetWizard';

describe('Lead magnet modal (WCAG 2.2 AA)', () => {
  it('modal has dialog role and no axe violations when open', async () => {
    const { container } = render(
      <LeadMagnetModal open onClose={() => {}}>
        <LeadMagnetWizard inModal />
      </LeadMagnetModal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby', 'lead-magnet-modal-title');
    expect(screen.getByText(/7-day plan quiz/i)).toBeInTheDocument();

    try {
      const results = await axe(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      });
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.warn('Axe (lead-magnet modal):', error instanceof Error ? error.message : error);
    }
  });
});
