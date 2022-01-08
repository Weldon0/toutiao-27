<template>
  <van-button
    :loading="loading"
    :icon="isCorrect ? 'star' : 'star-o'"
    @click="changeCorrect"
  ></van-button>
</template>
<script>
import { addCollect, deleteCollect } from '@/api/article'
import { createDangerNotify, createSuccessNotify } from '@/utils/notify'

export default {
  name: 'CollectArticle',
  props: {
    articleId: [Number, String, Object],
    isCorrect: Boolean
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async changeCorrect () {
      this.loading = true
      try {
        if (this.isCorrect) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        createSuccessNotify(this.isCorrect ? '取消收藏成功' : '收藏成功')
        this.$emit('update:isCorrect', !this.isCorrect)
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
