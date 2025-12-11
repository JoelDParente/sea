import type { ColorSystemOptions } from '@mui/material/styles';

import { california, kepple, nevada, redOrange, shakespeare, stormGrey, vividBlue } from './colors';
import type { ColorScheme } from './types';

export const colorSchemes = {
  dark: {
    palette: {
      action: { 
        disabledBackground: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.38)',
      },
      background: {
        default: '#0f1419',
        paper: '#1a1f2e',
        level1: '#242d3f',
        level2: '#2d3748',
        level3: '#364151',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: 'rgba(255, 255, 255, 0.12)',
      error: {
        ...redOrange,
        light: '#ff7f6b',
        main: '#f04438',
        dark: '#c92a1f',
        contrastText: '#ffffff',
      },
      info: {
        ...shakespeare,
        light: '#5fc5d9',
        main: '#04aad6',
        dark: '#0787b3',
        contrastText: '#ffffff',
      },
      neutral: { ...nevada },
      primary: {
        ...vividBlue,
        light: '#93c5fd',
        main: '#3b82f6',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#9ca3af',
        main: '#6b7280',
        dark: '#4b5563',
        contrastText: '#ffffff',
      },
      success: {
        ...kepple,
        light: '#5fe9ce',
        main: '#15b79f',
        dark: '#0d9382',
        contrastText: '#ffffff',
      },
      text: {
        primary: '#e8eef7',
        secondary: '#9ca3af',
        disabled: '#6b7280',
      },
      warning: {
        ...california,
        light: '#ffbb1f',
        main: '#fb9c0c',
        dark: '#de7101',
        contrastText: '#ffffff',
      },
    },
  },
  light: {
    palette: {
      action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
      background: {
        default: 'var(--mui-palette-common-white)',
        defaultChannel: '255 255 255',
        paper: 'var(--mui-palette-common-white)',
        paperChannel: '255 255 255',
        level1: 'var(--mui-palette-neutral-50)',
        level2: 'var(--mui-palette-neutral-100)',
        level3: 'var(--mui-palette-neutral-200)',
      },
      common: { black: '#000000', white: '#ffffff' },
      divider: 'var(--mui-palette-neutral-200)',
      dividerChannel: '220 223 228',
      error: {
        ...redOrange,
        light: redOrange[400],
        main: redOrange[500],
        dark: redOrange[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      info: {
        ...shakespeare,
        light: shakespeare[400],
        main: shakespeare[500],
        dark: shakespeare[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      neutral: { ...stormGrey },
      primary: {
        ...vividBlue,
        light: vividBlue[400],
        main: vividBlue[500],
        dark: vividBlue[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      secondary: {
        ...nevada,
        light: nevada[600],
        main: nevada[700],
        dark: nevada[800],
        contrastText: 'var(--mui-palette-common-white)',
      },
      success: {
        ...kepple,
        light: kepple[400],
        main: kepple[500],
        dark: kepple[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
      text: {
        primary: 'var(--mui-palette-neutral-900)',
        primaryChannel: '33 38 54',
        secondary: 'var(--mui-palette-neutral-500)',
        secondaryChannel: '102 112 133',
        disabled: 'var(--mui-palette-neutral-400)',
      },
      warning: {
        ...california,
        light: california[400],
        main: california[500],
        dark: california[600],
        contrastText: 'var(--mui-palette-common-white)',
      },
    },
  },
} satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
