<template>
  <div class="article-item"
  >
    <van-cell>
      <template #title>
        {{ article.title }}
      </template>
      <template #label>
        <div v-if="article.cover.type === 3">
          <van-row :gutter="8">
            <van-col
              :span="8"
              v-for="(item, index) in article.cover.images"
              :key="index"
            >
              <van-image
                width="100"
                height="100"
                fit="fill"
                :src="item"
              />
            </van-col>
          </van-row>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | reTime }}</span>
        </div>
      </template>

      <!-- 默认插槽-->
      <template #default v-if="article.cover.type === 1">
        <van-image
          :src="article.cover.images[0]"
          width="100"
          height="100"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
// 闭包
// 原型链
// 继承
// 防抖节流
// es6新语法
// 数组方法  map some every filter forEach reduce
// promise

// 总结：线上笔记 本本
// 思路：流程图
export default {
  name: 'article-item',
  props: {
    article: Object
  },
  methods: {
    showImage (images) {
      ImagePreview({
        images,
        closeable: true
      })
    }
  }
}
</script>
<style lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
