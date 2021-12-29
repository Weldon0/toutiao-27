<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />

    <van-form @submit="onSubmit" ref="formRef">
      <van-field
        required
        v-model="user.mobile"
        name="mobile"
        clearable
        placeholder="请输入手机号"
        maxlength="11"
        :rules="formRules.mobile"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        required
        v-model="user.code"
        type="number"
        name="code"
        placeholder="输入验证码"
        :rules="formRules.code"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            format="ss s"
            :time="time"
            @finish="isShowCountDown=false"
          />
          <van-button
            :disabled="isDisabled"
            v-else
            class="send-sms-btn"
            type="primary"
            size="small"
            native-type="button"
            @click="sendSms"
          >获取验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      isDisabled: false,
      isShowCountDown: false,
      time: 5 * 1000,
      user: {
        mobile: '13911111112',
        code: '246810'
      },
      formRules: {
        mobile: [{
          required: true,
          message: '请填写手机号'
        }, {
          pattern: /^\d{11}$/,
          message: '手机号不符合规则'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码不符合规则'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 实现需求：
    // 1、点击之后禁用按钮(防止重复点击，造成连续发送请求)
    // 2、接口请求成功之后再去倒计时(也需要解除按钮的禁用，否则倒计时结束之后依旧不能发送请求)
    // 3、接口如果错误，解除按钮的禁用(否则按钮一直无法点击)

    async sendSms () {
      // 通过ref校验表单中的mobile
      // 1、校验手机号的表单
      // 请求失败的时候和倒计时结束的时候结束倒计时
      // 1、监听count-down组件的finish事件
      // 2、catch到错误的时候，结束倒计时(修改倒计时标识即可)
      try {
        await this.$refs.formRef.validate('mobile') // 校验mobile表单
        this.isDisabled = true
        // this.isShowCountDown = true // 倒计时的展示标识变为true开始计时
      } catch (e) {
        // 捕获到校验失败的错误，直接打印或者提示都ok
        return console.log(e)
      }

      // 验证码请求
      // 需要请求接口获取验证码
      try {
        await sendSms(this.user.mobile) // 发送验证码请求发起
        // 请求成功
        // 倒计时
        this.isShowCountDown = true
        this.isDisabled = false
        this.$toast('发送成功') // 发送成功进行成功的提示
      } catch (e) {
        // this.isShowCountDown = false // 捕获到错误让倒计时隐藏
        this.isDisabled = false
        if (e.response.status === 429) { // 如果状态码429,说明发送太频繁，进行错误提示
          // 进行错误的处理提示
          this.$toast('发送太频繁了')
        } else { // 如果不是429则可能为未知的错误原因，直接提示发送失败即可
          this.$toast('发送失败')
        }
      }
    },
    async onSubmit (value) {
      // loading提示
      // 单例模式，下一个toast会清除上一个提示框
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      // 使用try catch进行错误的捕获
      try {
        const res = await login(value)
        this.$toast.success('登录成功')
        // 获取到的结果存储到vuex
        // mutations 存储数据
        // this.$store.commit('mutaions方法名'， res.data.data)
        this.$store.commit('setUser', res.data.data)
        //  路由跳转
        this.$router.push('/my')
      } catch (e) {
        // 错误提示
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
