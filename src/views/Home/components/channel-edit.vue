<template>
  <div class="channel-edit">
    <van-nav-bar title="编辑标题"/>
    <van-cell>
      <template #title>
        <span class="title-text">我的频道</span>
      </template>

      <template #default>
        <van-button
          class="edit-btn"
          size="mini"
          round
          plain
          type="danger"
        >
          完成/编辑
        </van-button>
      </template>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(item, index) in myChannels" :key="item.id">
        <template #icon>
          <van-icon name="clear"/>
        </template>
        <template #text>
          <span class="text" :class="{active: index === active}">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell>
      <template #title>
        <span class="title-text">推荐频道</span>
      </template>
    </van-cell>
    <van-grid
      class="recommend-grid"
      :gutter="10"
    >
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        class="grid-item"
        icon="plus"
        :text="item.name"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
import { differenceBy } from 'lodash'

export default {
  name: 'channel-edit',
  props: {
    myChannels: {
      type: Array
    },
    active: {
      type: Number
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    recommendChannels () {
      // 通过lodash进行不同数据的对比
      return differenceBy(this.allChannels, this.myChannels, 'id')
    }
    // recommendChannels () {
    //   return this.allChannels.filter(item => {
    //     // item
    //     return !this.myChannels.some(myChannel => item.id === myChannel.id)
    //   })
    // }
  },
  methods: {
    async getAllChannels () {
      const res = await getAllChannels()
      console.log(res.data.data.channels)
      this.allChannels = res.data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  //padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
