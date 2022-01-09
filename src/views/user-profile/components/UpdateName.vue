<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>

import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    nickName: String
  },
  data () {
    return {
      message: this.nickName
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onConfirm () {
      // 提示loading的效果
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })

      try {
        // 判断用户填写的数据是否为空
        if (!this.message) {
          this.$toast('内容不能为空')
          return
        }

        // 调用接口更新数据
        await updateUserProfile({
          name: this.message
        })
        // 进行成功消息的提示
        this.$toast.success('更新成功')
        // 更新页面数据
        this.$emit('update:nickName', this.message)
        // 关闭弹层
        this.$emit('close')
      } catch (e) {
        // 如果接口调用失败，进行失败的提示
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
