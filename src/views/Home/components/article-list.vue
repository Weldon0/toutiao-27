<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="500"
      @refresh="onRefresh"
    >
      <van-list
        ref="listRef"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~~~~~"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了"
      >
        <ArticleItem
          class="aaa"
          @click.native="$router.push(`/article/${item.art_id}`)"
          v-for="item in list"
          :key="item.art_id" :article="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/views/Home/components/article-item'

export default {
  name: 'article-list',
  props: {
    channel: {
      type: Object
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      isreFreshLoading: false,
      refreshSuccessText: '刷新成功',
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 记录上一次获取数据的时间戳
      error: false
    }
  },
  methods: {
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })

        this.list = data.data.results
        // 记录时间戳
        this.timestamp = data.data.pre_timestamp
        // 手动调用组件的check方法，检查数据是否铺满页面
        this.$refs.listRef.check()
        this.isreFreshLoading = false
      } catch (e) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
        this.$notify({
          type: 'danger',
          message: '请求失败'
        })
      }
    },
    async onLoad () {
      // onload方法触发了，默认就把loding属性变为true
      // loading为true 不会重新触发onload方法
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        this.list.push(...data.data.results)
        this.loading = false
        // pre_timestamp 不存在就证明没有数据了
        if (data.data.pre_timestamp) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (e) {
        // 如果捕获到错误，让当前组件的状态变为true，页面会有错误提示，点击以后，会重新触发load
        // 用于重新加载数据
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.article-list {
  /*// 百分比单位是相对于父元素的*/
  /*// height: 100%;*/

  /*// 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响*/
  /*// 1vw = 视口宽度的百分之一*/
  /*// 1vh = 视口高度的百分之一*/
  /*height: 79vh;*/
  overflow-y: auto;
  height: calc(100vh - 20px);
}
</style>
