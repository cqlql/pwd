module.exports = {
  plugins: [
    require('autoprefixer')({
      remove: false,
    }),
    require('postcss-pxtorem')({
      replace: false,
      rootValue: 100,
      propList: ['*'],
      minPixelValue: 2,
      selectorBlackList: [/^html$/],
    }),
  ],
}
