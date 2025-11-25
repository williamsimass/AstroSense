/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                astro: {
                    dark: '#0f172a', // Slate 900
                    main: '#1e1b4b', // Indigo 950
                    accent: '#c084fc', // Purple 400
                    gold: '#fbbf24', // Amber 400
                }
            }
        },
    },
    plugins: [],
}
