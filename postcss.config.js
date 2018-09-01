module.exports = {
  plugins: [
    // require('precss')({ /* ...options */ }),
    require('autoprefixer')({
      browsers: ['last 5 versions', '>1%'],
      cascade: false,
    }),
  ],
}
