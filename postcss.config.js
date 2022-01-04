module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 37.5, // 如果将来是自己的设计图(750px)，直接写75即可！ 就可以设计图是多少px，css书写就写多少px
      rootValue: (obj) => {
        // 如果要解析的文件中包含vant，说明就是vant的样式组件，就把它的rem基准值设置为37.5
        console.log(obj)
        return obj.file.includes('vant') ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown-css'
    }
  }
}
