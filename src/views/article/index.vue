<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中
        </van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate }}</div>
          <FollowUser
            :authorId="article.aut_id"
            :isFollowed.sync="article.is_followed"
          />
        </van-cell>
        <!-- 用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" ref="articleRef" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域-->
        <CommentList :list="commentList" ref="commentList" :totalCount.sync="totalCount" :source="article.art_id"/>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow=true"
          >写评论
          </van-button>
          <van-icon
            name="comment-o"
            :badge="totalCount"
            color="#777"
          />
          <CollectArticle :articleId="article.art_id" :isCorrect.sync="article.is_collected" class="btn-item"/>
          <LikeArticle class="btn-item" :isLike.sync="article.attitude" :articleId="article.art_id"></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure"/>
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure"/>
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!--------------------------------  发布评论 -------------------------------------->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        @onPostSuccess="onPostSuccess"
        :target="article.art_id"
      ></CommentPost>
    </van-popup>
    <!-------------------------------- /发布评论 -------------------------------------->

    <!------------------------ 评论回复 ------------------------------>
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 100%"
    >
      <CommentReply v-if="isReplyShow" @close="isReplyShow=false" :comment="currentComment"/>
    </van-popup>
    <!------------------------ /评论回复 ------------------------------>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
// import { cloneDeep } from 'lodash'
import FollowUser from '@/views/article/components/FollowUser'
import 'github-markdown-css'
import { ImagePreview } from 'vant'
import CollectArticle from '@/views/article/components/CollectArticle'
import LikeArticle from '@/views/article/components/LikeArticle'
import CommentList from '@/views/article/components/CommentList'
import CommentPost from '@/views/article/components/CommentPost'
import CommentReply from '@/views/article/components/CommentReply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide () {
    // this ==> 定义方法位置的组件
    return {
      handleReply: (item) => {
        // 要使用剪头函数才能获取父组件的this
        // console.log(item)
        this.currentComment = item
        this.isReplyShow = true
      },
      num: 0,
      articleId: this.articleId
    }
  },
  props: {
    // 使用props获取动态路由的数据
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: false,
      errStatus: '',
      imgList: [],
      totalCount: 0,
      isPostShow: false,
      commentList: [],
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetail()
  },
  mounted () {
    console.log(this.$refs)
  },
  methods: {
    onPostSuccess (item) {
      this.commentList.unshift(item)
      this.isPostShow = false
    },
    previewImg () {
      // ref对应的dom节点
      const box = this.$refs.articleRef

      // 内容里面的所有的img标签 ==> 为数组
      const images = box.querySelectorAll('img')

      // 为数组 遍历
      images.forEach(item => {
        this.imgList.push(item.src)

        item.onclick = () => {
          ImagePreview({
            images: this.imgList,
            closeable: true
          })
        }
      })
    },
    async getDetail () {
      this.loading = true
      try {
        const res = await getArticleById(this.articleId)
        console.log(res.data.data)
        this.article = res.data.data

        this.loading = false
        this.$nextTick(() => {
          this.previewImg()
        })
      } catch (e) {
        if (e?.response?.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .btn-item {
      border: none;
      box-sizing: content-box;

      /deep/ .van-icon-star {
        color: red;
      }

      /deep/ .van-icon-good-job {
        color: red;
      }
    }

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
