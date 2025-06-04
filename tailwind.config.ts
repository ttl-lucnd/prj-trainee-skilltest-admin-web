import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        base: ['14px', '20px'],
        medium: ['0.875rem', '1.2'],
        'body-xl': ['18px', '25.2px'],
        'body-lg': ['16px', '19.2px'],
        'body-md': ['14px', '16.8px'],
        'body-sm': ['12px', '14px'],
        'body-xs': ['10px', '12.1px'],
      },
      colors: {
        // Main Colors
        main: {
          primary: {
            1: '#404958', // Primary 1
            2: '#545F71', // Primary 2 - main
            3: '#9BA5B7', // Primary 3
            4: '#EEF1F4', // Primary 4
          },
          secondary: {
            1: '#33AAFF', // Secondary 1
            2: '#1F56CC', // Secondary 2
          },
        },
        // Status Colors
        status: {
          success: '#439F6E',
          success_bg: '#F1FFF4',
          error: '#E9034E',
          error_bg: '#FFF5F5',
        },

        // Greyscale Colors
        grey: {
          DEFAULT: '#DBE1E7',
          1: '#DBE1E7',
          2: '#EAEAEA',
          3: '#D3DCE3',
        },
        purple: {
          DEFAULT: '#D946EF',
          1: '#D946EF',
          2: '#F5D0FE',
          500: '#60519B',
        },
        // Additional Colors from the image
        white: '#FFFFFF',
        black: '#000000',
        textDefaultColor: '#232625',
        red: {
          DEFAULT: '#FF7676',
          300: '#FFD5D5',
          400: '#FF8A9B',
          500: '#FF4D67',
          550: '#FA5959',
        },
        amber: {
          DEFAULT: '#F3B919',
        },
        blue: {
          DEFAULT: '#33AAFF',
        },
        orange: {
          DEFAULT: '#FB923C',
          500: '#FFAB38',
          600: '#FB9400',
        },
        green: {
          DEFAULT: '#4ADE80',
          500: '#35DEBC',
          600: '#22BB9C',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          1: '#404958',
          2: '#2665EF',
          3: '#DCDFEA',
          4: '#EEF1F4',
          5: '#7D89B0',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          1: '#8DA6FA',
          2: '#C7D2FE',
          3: '#AABBFF',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        button: {
          secondary: {
            DEFAULT: '#2665EF',
            foreground: '#FFFFFF',
          },
        },
        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'var(--sidebar-border)',
          ring: 'hsl(var(--sidebar-ring))',
          'menu-button': '#2665EF',
          'chevron-down': '#667080',
          'menu-sub-button-active': '#8DA6FA',
          'menu-sub-button-active-foreground': '#FFFFFF',
        },
        other: {
          red: '#FF7676',
        },
        icon: {
          secondary: '#667080',
        },
        liveActive: '#33DC88',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
