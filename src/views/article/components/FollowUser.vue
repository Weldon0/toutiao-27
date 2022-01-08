<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
  >已关注
  </van-button>
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注
  </van-button>
</template>

<script>
import { createSuccessNotify, createWarningNotify } from '@/utils/notify'
import { addFollow, deleteFollow } from '@/api/user'

export default {
  props: {
    // 是否关注的状态从父组件接收
    isFollowed: Boolean,
    authorId: [Number, String]
  },
  name: 'follow-user',
  data () {
    return {
      // loading效果维护在子组件内部
      loading: false
    }
  },
  methods: {
    async onFollow () {
      //  1、判断是否登录
      if (!this.$store.state.user) return createWarningNotify('请登录')

      //  开启loanding效果
      this.loading = true
      // 获取作者的id
      //  请求接口
      try {
        //  判断当前文章的作者是否被关注
        if (this.isFollowed) {
          await deleteFollow(this.authorId)
          createSuccessNotify('取消成功')
        } else {
          await addFollow(this.authorId)
          createSuccessNotify('关注成功')
        }
        // this.isFollowed = !this.isFollowed
        // 子组件直接修改父组件传递过来的值，使用sync修饰符
        this.$emit('update:isFollowed', !this.isFollowed)
      } catch (e) {
        if (e?.response?.status === 400) {
          createWarningNotify('不能关注自己')
        } else {
          createWarningNotify('操作失败')
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
