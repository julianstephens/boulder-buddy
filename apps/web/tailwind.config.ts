// tailwind config is required for editor support
import sharedConfig from "tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config = {
  ...sharedConfig,
  content: [
    ...(sharedConfig.content as any),
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  plugins: [...(sharedConfig.plugins as any), require("daisyui")],
  daisyui: {
    logs: false,
  },
} satisfies Config;

export default config;
