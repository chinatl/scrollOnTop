const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
  outputDir: "../docs",
  publicPath: process.env.NODE_ENV === "production" ? "/vant-demo/" : "/",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    // proxy: "http://192.168.31.44:8080"
    // proxy: "http://192.168.31.57:8080"
    proxy: "http://192.168.31.201:80"
    // proxy: "http://192.168.31.18:8080"
  }
};
