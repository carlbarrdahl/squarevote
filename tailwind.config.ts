import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        ...colors,
        primary: colors.blue,
        gray: colors.slate,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), forms({ strategy: "class" })],
} satisfies Config;
