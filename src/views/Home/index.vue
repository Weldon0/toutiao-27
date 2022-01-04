<template>
  <div class="home-container">
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          size="small"
          type="info"
          @click="$router.push('/search')"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <van-tabs
      class="channel-tabs"
      animated
      border
      swipeable
      v-model="active"
      swipe-threshold="3"
    >
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"/>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '90%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit @changeChannels="changeChannels" :active.sync="active" :myChannels="channels"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/Home/components/article-list'
import ChannelEdit from '@/views/Home/components/channel-edit'
import { getItem } from '@/utils/localstoreage'
import { TOUTIAO_CHANNELS } from '@/constants'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () {
  },
  methods: {
    changeChannels (index) {
      this.active = index
      this.isChannelEditShow = false
    },
    // 获取当前用户的频道数据
    async getChannels () {
      // const res = await getUserChannels()
      // this.channels = res.data.data.channels

      // 用户登录了 ==> 请求接口
      // 本地存储没有数据 ==> 请求接口
      const localChannels = getItem(TOUTIAO_CHANNELS)
      if (this.user || !localChannels) {
        // 登录了
        // 本地存储没数据
        const res = await getUserChannels()
        this.channels = res.data.data.channels
      } else {
        // 没有登录并且本地存储有数据
        this.channels = localChannels
      }
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  /deep/ .channel-tabs {
    //padding-right: 60px;

    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);

      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
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
