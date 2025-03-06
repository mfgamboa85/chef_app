import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	base: "/chef_app",
	plugins: [
		react()
	]
})