<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div v-if="!user" class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png">
        <span class="text">登录&nbsp;/&nbsp;注册</span>
      </div>
    </div>

    <!-- 已登录 -->
    <div v-else class="header user-info">
      <!-- 用户信息 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar"
                     round
                     fit="cover"
                     :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button to="/user/profile" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 用户数据 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">👍🏻</span>
        </div>
      </div>
    </div>

    <!--宫格导航的布局样式-->
    <van-grid class="grid-nav mb-9" clickable :column-num="2">
      <van-grid-item class="grid-item" to="/">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item" url="/vant/mobile.html">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!--底部单元格布局-->
    <van-cell title="消息通知" is-link/>
    <van-cell class="mb-9" title="小智同学" is-link/>
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="logOut"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入接口
import { getUserInfo } from '@/api/user'
// 用户是否登录 ==> token
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    //  用户是否登录
    if (this.user) {
      this.getUserInfo()
    }
  },
  mounted () {
  },
  methods: {
    async getUserInfo () {
      // 调用接口，赋值数据
      const res = await getUserInfo()
      this.userInfo = res.data.data
    },
    logOut () {
      // console.log('logout')
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出？'
      }).then(res => {
        console.log('点击了确认')
        //  退出逻辑
        //  触发mutatioins方法
        this.$store.commit('setUser', null)
      }, () => {
        console.log('惦记了取消')
      })
    }
  }
}
</script>
<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      .toutiao-shoucang {
        color: #eb5253;
      }

      .toutiao-lishi {
        color: #ff9d1d;
      }

      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
