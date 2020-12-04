module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sebooks-test/'
    : '/'
}
