<template>
  <div class="home-container">
    <van-nav-bar
      class="page-nav-bar"
      title="测试"
      fixed
    >
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          size="small"
          type="info"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }
}
</style>
