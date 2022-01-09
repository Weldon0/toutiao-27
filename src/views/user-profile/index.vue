<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell class="avatar-cell" title="头像" is-link center>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell @click="isUpdateNameShow=true" title="昵称" :value="userInfo.name" is-link/>
    <van-cell @click="isUpdateGenderShow=true" title="性别" :value="genderMap.get(userInfo.gender)" is-link/>
    <van-cell title="生日" :value="userInfo.birthday" is-link/>
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%;"
      position="bottom"
    >
      <UpdateName :nickName.sync="userInfo.name" @close="isUpdateNameShow=false"/>
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <UpdateGender @close="isUpdateGenderShow=false" :gender="userInfo.gender"/>
    </van-popup>
    <!-- /编辑昵称 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import { genderMap } from '@/constants'
import UpdateName from '@/views/user-profile/components/UpdateName'
import UpdateGender from '@/views/user-profile/components/update-gender'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender
  },
  props: {},
  data () {
    return {
      userInfo: {},
      genderMap,
      isUpdateNameShow: false,
      isUpdateGenderShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {
  },
  methods: {
    async getUserInfo () {
      try {
        const res = await getUserProfile()
        this.userInfo = res.data.data
      } catch (e) {
        this.$toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }

    .avatar {
      width: 60px;
      height: 60px;
    }
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
