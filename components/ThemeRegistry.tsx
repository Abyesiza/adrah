'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff', // Bright cyan
      light: '#66e6ff',
      dark: '#0099cc',
      contrastText: '#000',
    },
    secondary: {
      main: '#ff6b9d', // Bright pink
      light: '#ff9bc4',
      dark: '#cc3d7a',
      contrastText: '#000',
    },
    success: {
      main: '#00ff88', // Bright green
      light: '#66ffaa',
      dark: '#00cc6a',
      contrastText: '#000',
    },
    warning: {
      main: '#ffb347', // Bright orange
      light: '#ffc675',
      dark: '#cc8f39',
      contrastText: '#000',
    },
    error: {
      main: '#ff4757', // Bright red
      light: '#ff6b7a',
      dark: '#cc3745',
      contrastText: '#fff',
    },
    info: {
      main: '#3742fa', // Bright blue
      light: '#6c7bff',
      dark: '#2c3ecc',
      contrastText: '#fff',
    },
    background: {
      default: '#0a0a0a', // Very dark background
      paper: '#1a1a1a', // Slightly lighter paper
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b8c1',
    },
    divider: '#2a2a2a',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00d4ff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00d4ff',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.3)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 6px 12px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.3)',
    '0px 10px 20px rgba(0, 0, 0, 0.3)',
    '0px 12px 24px rgba(0, 0, 0, 0.3)',
    '0px 14px 28px rgba(0, 0, 0, 0.3)',
    '0px 16px 32px rgba(0, 0, 0, 0.3)',
    '0px 18px 36px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 22px 44px rgba(0, 0, 0, 0.3)',
    '0px 24px 48px rgba(0, 0, 0, 0.3)',
    '0px 26px 52px rgba(0, 0, 0, 0.3)',
    '0px 28px 56px rgba(0, 0, 0, 0.3)',
    '0px 30px 60px rgba(0, 0, 0, 0.3)',
    '0px 32px 64px rgba(0, 0, 0, 0.3)',
    '0px 34px 68px rgba(0, 0, 0, 0.3)',
    '0px 36px 72px rgba(0, 0, 0, 0.3)',
    '0px 38px 76px rgba(0, 0, 0, 0.3)',
    '0px 40px 80px rgba(0, 0, 0, 0.3)',
    '0px 42px 84px rgba(0, 0, 0, 0.3)',
    '0px 44px 88px rgba(0, 0, 0, 0.3)',
    '0px 46px 92px rgba(0, 0, 0, 0.3)',
    '0px 48px 96px rgba(0, 0, 0, 0.3)',
  ],
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 