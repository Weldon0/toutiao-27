<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="修改性别"
      :columns="columns"
      :default-index="gender"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    gender: Number
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: null // 当前性别
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
    onConfirm () {

    },
    // 选择器发生变化的时候
    onPickerChange (picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less">
</style>
