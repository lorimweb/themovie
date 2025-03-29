import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BackToTop from '../BackToTop/BackToTop';
import * as utils from '../../utils/utils';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

describe('BackToTop', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = () => {
    return render(
      <ThemeProvider theme={theme}>
        <BackToTop />
      </ThemeProvider>
    );
  };

  it('should not show button when page is at top', () => {
    renderWithTheme();
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should show button when page is scrolled down beyond 300px', () => {
    renderWithTheme();

    // Simulate scrolling down past threshold
    Object.defineProperty(window, 'scrollY', {
      value: 301,
      configurable: true,
    });

    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should hide button when page is scrolled back up', () => {
    renderWithTheme();

    // First scroll down
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      configurable: true,
    });
    fireEvent.scroll(window);

    // Then scroll back up
    Object.defineProperty(window, 'scrollY', {
      value: 200,
      configurable: true,
    });
    fireEvent.scroll(window);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should call scrollToTop with correct parameters when clicked', () => {
    const scrollToTopSpy = vi.spyOn(utils, 'scrollToTop');
    renderWithTheme();

    // Make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      configurable: true,
    });
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollToTopSpy).toHaveBeenCalledWith(0, 'smooth');
  });

  it('should apply mobile styles when screen width is <= 768px', () => {
    // Set mobile window width
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
      writable: true
    });

    renderWithTheme();

    // Make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      configurable: true,
    });
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      bottom: '16px',
      right: '16px',
      width: '36px',
      height: '36px'
    });
  });

  it('should update styles when window is resized', async () => {
    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
      writable: true
    });

    renderWithTheme();

    // Make button visible
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      configurable: true,
    });
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    
    // Verify desktop styles
    await waitFor(() => {
      expect(button).toHaveStyle({
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px'
      });
    });

    // Change to mobile width
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
      writable: true
    });

    fireEvent.resize(window);
    
    // Verify mobile styles
    await waitFor(() => {
      expect(button).toHaveStyle({
        bottom: '16px',
        right: '16px',
        width: '36px',
        height: '36px'
      });
    });
  });

  it('should remove scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderWithTheme();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});