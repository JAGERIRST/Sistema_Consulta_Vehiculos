const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/', // URL del backend en Node.js
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
});