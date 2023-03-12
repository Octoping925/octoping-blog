const BLOG = require("./blog.config");
const { fontFamily } = require("tailwindcss/defaultTheme");

const fontSansCJK = [`"Noto Sans CJK KR"`, `"Noto Sans KR"`];
const fontSerifCJK = [`"Noto Serif CJK KR"`, `"Noto Serif KR"`];

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./layouts/**/*.{js,ts,tsx}",
  ],
  darkMode: BLOG.appearance === "auto" ? "media" : "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.lightBackground || "#ffffff",
        },
        night: {
          DEFAULT: BLOG.darkBackground || "#111827",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', ...fontFamily.sans, ...fontSansCJK],
        serif: ['"Source Serif"', ...fontFamily.serif, ...fontSerifCJK],
        noEmoji: [
          '"IBM Plex Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
          "Nanum Gothic",
        ],
      },
      minWidth: {
        650: "650px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
