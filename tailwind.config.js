import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            filter: {
                'brightness-0': 'brightness(0%)',
                'brightness-50': 'brightness(50%)',
                'brightness-100': 'brightness(100%)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'expand-x': {
                    from: { width: '0' },
                    to: { width: '600px' }
                },
                'shrink-x': {
                    from: { width: '600px' },
                    to: { width: '0' }
                },
                wiggle: {
                    '0%': { transform: 'rotate(-3deg)', opacity: '0' },
                    '50%': { transform: 'rotate(3deg)', opacity: '1' },
                    '100%': { transform: 'rotate(-3deg)', opacity: '0' }
                },

                wave: {
                    '0%': { transform: 'rotate(0.0deg)' },
                    '10%': { transform: 'rotate(30.0deg)' },
                    '20%': { transform: 'rotate(-8.0deg)' },
                    '30%': { transform: 'rotate(30.0deg)' },
                    '40%': { transform: 'rotate(-4.0deg)' },
                    '50%': { transform: 'rotate(20.0deg)' },
                    '60%': { transform: 'rotate(0.0deg)' },
                    '100%': { transform: 'rotate(0.0deg)' }
                },

                slideIn: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0px)', opacity: '1' }
                },

                shake: {
                    '0%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                    '100%': { transform: 'rotate(-3deg)' }
                },
                flip: {
                    '0%': { transform: 'rotateY(0)' },
                    '50%': { transform: 'rotateY(180deg)' },
                    '100%': { transform: 'rotateY(0)' }
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                fadeOut: {
                    from: { opacity: '1' },
                    to: { opacity: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'expand-x': 'expand-x 0.2s ease-out',
                'shrink-x': 'shrink-x 0.2s ease-out',
                wiggle: 'wiggle 4000ms ease-in-out',
                wave: 'wave 2000ms linear infinite',
                slideIn: 'slideIn 2000ms linear',
                shake: 'shake 1200ms ease-in-out',
                flip: 'flip 1s linear infinite',
                fadeIn: 'fadeIn 1s ease-in',
                fadeOut: 'fadeOut 1s ease-in forwards'
            }
        }
    },
    plugins: [tailwindcssAnimate]
};
