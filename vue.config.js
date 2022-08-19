const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    port: 8088,
    proxy: {
      '/fanBlog': {
        // target: 'http://fan223.cn:8001',
        target: 'http://localhost:8001',
        changeOrigin: true,
        ws: true,
      }
    }
  }
})
