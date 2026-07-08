import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f7f5ef",
        ink: "#24332b",
        muted: "#647067",
        olive: {
          50: "#edf4ef",
          100: "#dbe6dc",
          500: "#7ea88b",
          600: "#658a72",
          700: "#4d6f58"
        },
        wheat: "#cbbf9a"
      },
      boxShadow: {
        soft: "0 14px 36px rgba(36, 51, 43, 0.08)",
        button: "0 12px 26px rgba(126, 168, 139, 0.25)"
      },
      borderRadius: {
        brand: "24px"
      },
      maxWidth: {
        page: "1180px"
      }
    }
  },
  plugins: []
};

export default config;
