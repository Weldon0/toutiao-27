<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="onCommentLike"
      >
        {{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | reTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="handleReply(comment)"
        >
          回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
// cv点赞的接口
// 定义loading效果:防止重复点击
// 处理图标实心或者空心的展示逻辑
import { addCommentLike, deleteCommentLike } from '@/api/comment'
import { createDangerNotify, createSuccessNotify } from '@/utils/notify'

export default {
  name: 'CommentItem',
  props: {
    // 每行的评论信息
    comment: {
      type: Object,
      required: true
    }
  },
  inject: ['handleReply', 'num'],
  data () {
    return {
      commentLoading: false // 是否点赞中
    }
  },
  methods: {
    async onCommentLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        createSuccessNotify(this.comment.is_liking ? '取消成功' : '点赞成功')

        this.comment.is_liking = !this.comment.is_liking
      } catch (e) {
        console.log(e)
        createDangerNotify('操作失败')
      }

      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 20px;
    }
  }

  .comment-content {
    font-size: 25px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    width: auto;
    padding-left: 20px;
    padding-right: 20px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;

    /deep/ .van-icon-good-job {
      color: red;
    }

    .van-icon {
      font-size: 30px;
    }
  }

  .liked {
    background-color: orange;
  }
}
</style>
