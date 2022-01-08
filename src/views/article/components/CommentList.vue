<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >

    <!--    <van-cell v-for="item in list" :key="item.com_id" :title="item.content"></van-cell>-->
    <CommentItem
      :comment="item"
      v-for="item in list"
      :key="item.com_id"
    />
  </van-list>
</template>
<script>
import { getComments } from '@/api/comment'
import { createDangerNotify } from '@/utils/notify'
import CommentItem from '@/views/article/components/CommentItem'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object]
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: undefined,
      limit: 10
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const res = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        this.list.push(...res.data.data.results)
        this.loading = false
        this.$emit('update:totalCount', res.data.data.total_count)
        if (res.data.data.results.length) {
          // 记录最后一次获取的数据的id，下一次请求的时候会作为参数传递给接口
          this.offset = res.data.data.last_id
        } else {
          // 如果请求的数据不存在,则让finished属性变为true，不会在请求数据
          this.finished = true
        }
      } catch (e) {
        createDangerNotify('获取错误')
      }
    }
  }
}
</script>
