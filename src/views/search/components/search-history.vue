<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isEdit">
        <van-tag type="danger" @click="deleteAll">全部删除</van-tag>
        <van-tag type="success" style="margin-left: 5px;" @click="isEdit=false">完成</van-tag>
      </template>
      <van-icon v-else name="delete" @click="isEdit=true"/>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="historyItemClick(index, item)"
    >
      <van-icon v-if="isEdit" name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: Array
  },
  data () {
    return {
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    deleteAll () {
      this.$emit('update:searchHistories', [])
    },
    historyItemClick (index, item) {
      if (this.isEdit) {
        //  删除
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
