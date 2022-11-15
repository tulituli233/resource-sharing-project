// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports={
  devServer:{
    proxy:'http://localhost:3838'
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
}