import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import { fileURLToPath } from 'url'


export default defineConfig({
	plugins: [
		react(), tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'MacOS Portfolio',
				short_name: 'Portfolio',
				description: 'My awesome portfolio',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}']
			}
		})
	],

		// whats a resolve ?
	resolve: {
		alias: {
			"#components": resolve(
				dirname(fileURLToPath(import.meta.url)),
				"src/components",
			),
						"#constants": resolve(dirname(fileURLToPath(import.meta.url)), constants),
						"#store": resolve(dirname(fileURLToPath(import.meta.url)), store),
						"#hoc": resolve(dirname(fileURLToPath(import.meta.url)), hoc),
						"#windows": resolve(dirname(fileURLToPath(import.meta.url)), windows),
		}
	}
})
