import { resolve } from "node:path";

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(import.meta.dirname, "src"),
			},
		],
	},
});
