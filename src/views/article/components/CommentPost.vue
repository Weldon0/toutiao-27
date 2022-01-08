<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      clearable
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  inject: ['articleId'],
  props: {
    target: [Number, String, Object],
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onPost () {
      // 单例模式，下一个toast开启，上一个自动会被关闭
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      try {
        const res = await addComment({
          target: this.target.toString(), // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: this.type === 'a' ? null : this.articleId// 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // 清空内容
        this.message = ''
        this.$emit('onPostSuccess', res.data.data.new_obj)
        this.$toast.success('发布成功')
      } catch (e) {
        this.$toast.fail('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
