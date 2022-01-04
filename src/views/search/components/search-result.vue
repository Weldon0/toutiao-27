<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      @load="onLoad"
    >
      <template #error>
        <img src="https://img0.baidu.com/it/u=4042958589,1130845243&fm=15&fmt=auto" alt="">
      </template>
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: String // 搜索关键字
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: true
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      try {
        // 请求接口
        const res = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })

        // 获取到结果数组push到列表项里面
        this.list.push(...res.data.data.results)
        // 默认只要Onload触发了，loading变为true ==> 不会触发onload事件
        this.loading = false

        if (res.data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (e) {
        // 如果出错了，error变为true，loading变为false => 可以重新触发load事件
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
