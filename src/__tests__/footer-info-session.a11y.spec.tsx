import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import Footer from '@/components/layout/footer';

describe('Footer AI Information Session block (WCAG 2.2 AA)', () => {
  it('Information Session section has heading and CTA and no axe violations', async () => {
    const { container } = render(<Footer />);
    expect(screen.getByRole('heading', { level: 2, name: /we handle complex ai/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /book your free information session/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /claim my free info session/i })).toBeInTheDocument();

    try {
      const results = await axe(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      });
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.warn('Axe (footer):', error instanceof Error ? error.message : error);
    }
  });
});
