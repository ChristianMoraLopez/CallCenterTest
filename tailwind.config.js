/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    darkMode: ["class"],
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: '#92EBAC',
    				foreground: '#2F5F42',
    				dark: '#5CAC7A',
    				light: '#C1F3D1',
    				saturated: '#6BFFBF'
    			},
    			secondary: {
    				DEFAULT: '#00EBE6',
    				foreground: '#007A6E',
    				dark: '#009C99',
    				light: '#7FF6F3',
    				saturated: '#00FFF9'
    			},
    			accent: {
    				DEFAULT: '#6EEB00',
    				foreground: '#4A8A00',
    				dark: '#4CA600',
    				light: '#B7F68D',
    				saturated: '#4EFF00'
    			},
    			success: {
    				DEFAULT: '#00EB46',
    				foreground: '#007A33',
    				dark: '#008C33',
    				light: '#7FF6A3',
    				saturated: '#00FF4D'
    			},
    			info: {
    				DEFAULT: '#00EB96',
    				foreground: '#005A46',
    				dark: '#007A6E',
    				light: '#66F6D6',
    				saturated: '#00FFC2'
    			},
    			warning: {
    				DEFAULT: '#0BEB00',
    				foreground: '#056600',
    				dark: '#0B8A00',
    				light: '#66F66A',
    				saturated: '#00FF00'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

export default tailwindConfig;
