import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                header: ['Roboto Mono', ...defaultTheme.fontFamily.sans],
            },
            letterSpacing: {
                tightest: '-.075em',
                tighter: '-.05em',
                tight: '-.025em',
                normal: '0',
                wide: '.025em',
                wider: '.05em',
                widest: '.1em',
                widest: '.6em',
              },
            colors: {
                primary : "#21D760",
                secondary: "#117132",
                bgPrimary : "#1A1A1A",
                bgSecondary : "#F0F0F0",
                price: "#D22E2E",
        },
    },
    plugins: [forms],

}
}
