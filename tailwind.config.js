/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			input: {
				sm: 44
			}
		},
	},
	corePlugins: {
		preflight: false
	}
}