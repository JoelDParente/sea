import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiOutlinedInput = {
  styleOverrides: {
    root: ({ ownerState, theme }: any) => ({
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : undefined,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.24)' : undefined,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
        borderWidth: 1.5,
      },
      backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : undefined,
    }),
  },
} satisfies Components<Theme>['MuiOutlinedInput'];

export const MuiFilledInput = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : undefined,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : undefined,
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : undefined,
      },
    }),
  },
} satisfies Components<Theme>['MuiFilledInput'];

export const MuiInputLabel = {
  styleOverrides: {
    root: ({ theme }: any) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
      '&.Mui-focused': {
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
      },
    }),
  },
} satisfies Components<Theme>['MuiInputLabel'];

export const MuiSelect = {
  styleOverrides: {
    icon: ({ theme }: any) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
    }),
    root: ({ theme }: any) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
    }),
  },
} satisfies Components<Theme>['MuiSelect'];

export const MuiInputBase = {
  styleOverrides: {
    input: ({ theme }: any) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.text.primary : undefined,
      '&::placeholder': {
        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : undefined,
        opacity: 1,
      },
    }),
  },
} satisfies Components<Theme>['MuiInputBase'];
