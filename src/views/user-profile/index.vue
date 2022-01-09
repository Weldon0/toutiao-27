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
    <input type="file" hidden ref="file" @change="onFileChange">
    <van-cell @click="$refs.file.click()" class="avatar-cell" title="头像" is-link center>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell @click="isUpdateNameShow=true" title="昵称" :value="userInfo.name" is-link/>
    <van-cell @click="isUpdateGenderShow=true" title="性别" :value="genderMap.get(userInfo.gender)" is-link/>
    <van-cell @click="isUpdateBirthdayShow=true" title="生日" :value="userInfo.birthday" is-link/>
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
      <UpdateGender
        @close="isUpdateGenderShow=false"
        :gender.sync="userInfo.gender"
      />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <UpdateBirthday :birthday.sync="userInfo.birthday" @close="isUpdateBirthdayShow=false"/>
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%;"
    >
      <UpdatePhoto :img="img"/>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import { genderMap } from '@/constants'
import UpdateName from '@/views/user-profile/components/UpdateName'
import UpdateGender from '@/views/user-profile/components/UpdateGender'
import UpdateBirthday from '@/views/user-profile/components/UpdateBirthday'
import UpdatePhoto from '@/views/user-profile/components/update-photo'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      userInfo: {},
      genderMap,
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
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
    onFileChange () {
      //  获取到你选择的文件
      const file = this.$refs.file.files[0]
      const imgUrl = URL.createObjectURL(file)
      // 获取本地的图片地址
      console.dir(imgUrl)
      // 获取的图片地址放到data里面，传递给 update-photo 子组件 子组件获取到图片进行一个预览的展示
      this.img = imgUrl
      // 弹出文件选择框
      this.isUpdatePhotoShow = true
    },
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
