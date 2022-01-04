<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', item)"
      icon="search"
      v-for="(item, index) in suggestList"
      :key="index"
    >
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: String
  },
  data () {
    return {
      suggestList: [],
      htmlStr: '<h3>234</h3>'
    }
  },
  computed: {},
  watch: {
    // 监听搜索内容的变化发起请求获取搜索建议列表
    searchText: {
      handler (value) {
        this.getList(value)
      },
      immediate: true // 首次也会触发事件
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    highlight (text) {
      // 搜索列表项里面的关键字替换成高亮的关键字(使用标签包裹的关键字)
      const highlightStr = `<span style="color: red">${this.searchText}</span>`
      const regStr = new RegExp(this.searchText, 'gi')
      return text.replace(regStr, highlightStr)
    },
    async getList (val) {
      try {
        const res = await getSearchSuggestions(val)
        console.log(res.data.data.options)
        this.suggestList = res.data.data.options
      } catch (e) {
        this.$toast('获取搜索建议失败~~~')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
