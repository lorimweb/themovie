import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BackToTop from '../BackToTop';
import * as utils from '../../utils/utils';

describe('BackToTop', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Reset scroll position
    window.scrollY = 0;

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    // Clean up mocks
    vi.clearAllMocks();
  });

  it('should not show button when page is at top', () => {
    render(<BackToTop />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should show button when page is scrolled down', () => {
    render(<BackToTop />);

    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });

    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call scrollToTop when button is clicked', () => {
    const scrollToTopSpy = vi.spyOn(utils, 'scrollToTop');

    render(<BackToTop />);

    // Simulate scrolling down to make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });

    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollToTopSpy).toHaveBeenCalledWith(0, 'smooth');
  });

  it('should adjust size for mobile screens', () => {
    // Set mobile window width
    Object.defineProperty(window, 'innerWidth', {
      value: 768,
    });

    render(<BackToTop />);

    // Make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
    });

    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      width: '36px',
      height: '36px',
      bottom: '16px',
      right: '16px',
    });
  });
});