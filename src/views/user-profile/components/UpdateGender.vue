<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="修改性别"
      :columns="columns"
      :default-index="localGender"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    gender: Number
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.gender
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 确定事件
    async onConfirm () {
      this.$toast.loading({
        message: '提交中...',
        forbidClick: true,
        duration: 0
      })

      try {
        await updateUserProfile({
          // 把自己本地修改的性别数据提交给服务器端
          gender: this.localGender
        })
        this.$toast.success('修改成功')
        this.$emit('close')
        this.$emit('update:gender', this.localGender)
      } catch (e) {
        this.$toast.fail('修改失败')
      }
    },
    // 选择器发生变化的时候
    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less">
</style>
