/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
console.log(defaultTheme.colors)
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	plugins: [
		require('tailwindcss-themer')({
			defaultTheme: {
				extend: {
					colors: {
						primary: 'red',
						formBorder: '#d1d5db',
						boxColor: 'white'
					}
				}
			},
			themes: [
				{
					name: 'dark',
					extend: {
						colors: {
							primary: 'blue',
							boxColor: '#1e293b',
							formBorder: '#6b7280'
						}
					}
				}, {
					name: 'vietcombank',
					extend: {
						colors: {
							primary: 'blue',
							boxColor: 'green',
							formBorder: '#6b7280'
						}
					}
				}
			]
		})
	],
	corePlugins: {
		preflight: false
	}
}