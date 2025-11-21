/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",      // app directory
        "./pages/**/*.{js,ts,jsx,tsx}",    // pages directory
        "./components/**/*.{js,ts,jsx,tsx}" // components
    ],
    theme: {
        extend: {
            fontFamily: {
                'mono-roboto': ['Roboto Mono', 'monospace'],
            },
        },
    },
    plugins: [],
};
