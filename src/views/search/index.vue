<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult :searchText="searchText" v-if="isResultShow"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
      @search="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory @search="onSearch" :searchHistories.sync="searchHistories" v-else/>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import { getItem, setItem } from '@/utils/localstoreage'
import { TOUTIAO_HISTORY } from '@/constants'

export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false, // 搜索结果是否展示
      searchHistories: getItem(TOUTIAO_HISTORY) || []
    }
  },
  computed: {},
  watch: {
    searchHistories (val) {
      //  保存本地存储
      setItem(TOUTIAO_HISTORY, val)
    }
  },
  created () {
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      // 如果搜索历史记录找到了，则删除找到的数据，把最新的结果添加在数组的最前面
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      // 点击取消的时候让路由回退
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
