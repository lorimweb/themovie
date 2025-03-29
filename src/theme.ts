export const theme = {
  colors: {
    primary: '#d9292a',
    secondary: '#ffc107',
    background: '#ffffff',
    text: '#fff',
    textLight: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.9)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.375rem',
    large: '0.5rem',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  }
} as const;

export type Theme = typeof theme;