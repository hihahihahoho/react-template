/** @type {import('tailwindcss').Config} */
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
							primary: 'green',
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