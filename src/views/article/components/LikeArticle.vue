<template>
  <van-button
    :loading="loading"
    :icon="isLike === 1 ? 'good-job' : 'good-job-o'"
    @click="changeLike"
  ></van-button>
</template>
<script>
import { createDangerNotify, createSuccessNotify } from '@/utils/notify'
import { addLike, deleteLike } from '@/api/user'

export default {
  name: 'CollectArticle',
  props: {
    articleId: [Number, String, Object],
    isLike: [Number, String]
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async changeLike () {
      this.loading = true
      try {
        if (this.isLike === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
        }
        createSuccessNotify(this.isLike === 1 ? '取消点赞成功' : '点赞成功')
        this.$emit('update:isLike', this.isLike === 1 ? -1 : 1)
      } catch (e) {
        createDangerNotify('操作失败')
      }

      this.loading = false
    }
  },
  created () {
  }
}
</script>
<style scoped lang="less">
</style>
