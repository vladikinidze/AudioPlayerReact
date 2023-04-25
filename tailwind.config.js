module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        screens: {
            'l': '300px',
            'playlistStyle': '370px',
            '2l': '400px',
            'sm': '500px',
            'tm': '600px',
            'md': '700px',
            'sidebarHide': '880px',
            'lg': '931px',
            'xl': '1126px',
            '2xl': '1330px',
            '3xl': '1534px',
            '4xl': '1738px',
            '5xl': '1942px',
            '6xl': '2146px',
        },
        extend: {
            gridTemplateColumns: {
                'playlists-mobile': 'repeat(auto-fill, minmax(208px, 1fr))',
                'playlists-tablet': 'repeat(auto-fill, minmax(256px, 1fr))',
                'playlists-desktop': 'repeat(auto-fill, minmax(180px, 1fr))',
            },
            boxShadow: {
                '3xl': '0 16px 24px rgba(0, 0, 0, .3), 0 6px 8px rgba(0, 0, 0, .2)',
            },
            flexGrow: {
                2: '2'
            },
            height: {
                '4.75': '18px',
            },
            width: {
                '4.75': '18px',
            }
        },
    },
    // plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};