module.exports = {
  // 服务器
  devServer:{
    port:'1314'
  },
  configureWebpack:{
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    }
  }
}
