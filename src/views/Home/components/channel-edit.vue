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
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        @click="myChannelClick(index, item)"
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="item.id"
      >
        <template #icon v-if="isEdit && item.id !== 0">
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
        @click="addChannel(item)"
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
import { addUserChannel, deleteUserChannel, getAllChannels } from '@/api/channels'
import { differenceBy } from 'lodash'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localstoreage'
import { TOUTIAO_CHANNELS } from '@/constants'
import { createDangerNotify, createSuccessNotify } from '@/utils/notify'

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
      allChannels: [],
      isEdit: false
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 通过lodash进行不同数据的对比
      return differenceBy(this.allChannels, this.myChannels, 'id')
    }
  },
  methods: {
    async deleteChannel (id) {
      try {
        if (this.user) {
          await deleteUserChannel(id)
          createSuccessNotify('删除成功')
        } else {
          //  修改之后channel存起来
          setItem(TOUTIAO_CHANNELS, this.myChannels)
        }
      } catch (e) {
        createDangerNotify('删除失败')
      }
    },
    myChannelClick (index, item) { // TODO: 注意参数接收的顺序不要写错了
      if (this.isEdit) {
        if (item.id === 0) {
          //  推荐频道
          return createDangerNotify('都说了不让删~~~~')
        }
        // 1、删除频道
        if (index <= this.active) {
          this.$emit('update:active', this.active - 1)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(item.id)
      } else {
        // 1、切换频道
        // 2、弹出层隐藏
        this.$emit('changeChannels', index)
      }
    },
    async addChannel (item) {
      //  判断用户是否登录
      if (this.user) {
        // 登录
        try {
          await addUserChannel({
            id: item.id, // 频道ID
            seq: this.myChannels.length // 序号
          })

          this.myChannels.push(item)
          createSuccessNotify('添加频道成功')
        } catch (e) {
          createDangerNotify('保存失败，请稍后重试')
        }
      } else {
        // 没有登录 存储到本地存储
        this.myChannels.push(item)
        setItem(TOUTIAO_CHANNELS, this.myChannels)
      }
    },
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
