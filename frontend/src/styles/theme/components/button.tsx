import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiButton = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      borderRadius: '12px',
      textTransform: 'none',

      '&.Mui-disabled': {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,255.12)'
            : 'rgba(0,0,0,0.2)',
        color:
          theme.palette.mode === 'dark'
            ? 'inherit'
            : 'inherit',
        borderColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.2)'
            : 'rgba(0,0,0,0.2)',
        cursor: 'not-allowed',
      },
    }),
    sizeSmall: { padding: '6px 16px' },
    sizeMedium: { padding: '8px 20px' },
    sizeLarge: { padding: '11px 24px' },
    textSizeSmall: { padding: '7px 12px' },
    textSizeMedium: { padding: '9px 16px' },
    textSizeLarge: { padding: '12px 16px' },

    // Improve visibility in dark mode for common variants
    containedPrimary: ({ theme }: any) => ({
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
      color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : undefined,
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
      },
    }),
    outlinedPrimary: ({ theme }: any) => ({
      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : undefined,
      color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
      '&:hover': {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.06)' : undefined,
      },
    }),
    textPrimary: ({ theme }: any) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(59,130,246,0.06)' : undefined,
      },
    }),
  },
} satisfies Components<Theme>['MuiButton'];
