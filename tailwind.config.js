/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "company-blue": {
          50: "#E0F8FF",
          100: "#B3F0FF",
          200: "#80E4FF",
          300: "#4DD8FF",
          400: "#00B8F5",
          500: "#0094C2",
          600: "#00729A",
          700: "#005373",
          800: "#00364D",
          900: "#001F2E",
        },
        "company-yellow": {
          50: "#FEFCE8",
          100: "#FEF9C2",
          200: "#FEF08A",
          300: "#FDEE56",
          400: "#FCF55F",
          500: "#E3DB4A",
          600: "#BEB63A",
          700: "#918E2C",
          800: "#6C6820",
          900: "#4B4A17",
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
