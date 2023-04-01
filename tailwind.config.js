module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      'sm': '500px',
      'md': '700px',
      'sidebarHide' : '800px',
      'lg': '931px',
      'xl': '1131px',
      '2xl': '1331px',
      '3xl': '1531px',
      '4xl': '1731px',
      '5xl': '1931px',
      '6xl': '2100px',
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
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
};