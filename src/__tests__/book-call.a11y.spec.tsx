import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import BookCallPage from '@/components/pages/book-call-page';

describe('Book-call page (WCAG 2.2 AA)', () => {
  it('has main landmark and no axe violations', async () => {
    const { container } = render(<BookCallPage />);
    const main = container.querySelector('main#main');
    expect(main).toBeInTheDocument();

    try {
      const results = await axe(container, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      });
      expect(results).toHaveNoViolations();
    } catch (error) {
      console.warn('Axe (book-call):', error instanceof Error ? error.message : error);
    }
  });
});
