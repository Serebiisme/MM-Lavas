<template>
  <div class="container background">
    <van-nav-bar
      left-text="返回"
      title="我的"
      fixed
      @click-left="$router.back()"
    />
    <van-list 
      class="dialog-content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
        <!-- <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        /> -->
      <van-row class="dialog__item">
        <van-col class="dialog__item__avatar" offset="1">
          <van-image
            class="border-radius border-radius--round"
            width="48"
            height="48"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          >
            <!-- <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template> -->
          </van-image>
        </van-col>
        <van-col class="dialog__item__content">
          <van-row class="dialog__item__info">
            <van-col>Serbia</van-col>
          </van-row>
          <van-row class="dialog__item__message">
              <van-col>
                <span>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息</span>
              </van-col>
          </van-row>
        </van-col>
      </van-row>

      <van-row class="dialog__item">
        <van-col class="dialog__item__content--right" offset="1">
          <van-row class="dialog__item__info--right">
            <van-col>Serbia</van-col>
          </van-row>
          <van-row class="dialog__item__message--right">
              <van-col>
                <span>消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息</span>
              </van-col>
          </van-row>
        </van-col>
        <van-col class="dialog__item__avatar">
          <van-image
            class="border-radius border-radius--round"
            width="48"
            height="48"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          >
            <!-- <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template> -->
          </van-image>
        </van-col>
      </van-row>
      
    </van-list>
    <footer class="dialog-footer">
      <van-search 
        left-icon=''
        placeholder="请输入发送消息内容" 
        v-model="sendContent" 
        shape="round" 
        show-action
        clearable
        label=' '
      >
        <div slot="action" @click="onSend">发送</div>
      </van-search>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'MM',
    metaInfo: {
      title: 'MM',
      meta: [
        { name: 'keywords', content: 'MM Chat system based on lavas PWA'},
        { name: 'description', content: 'MM 即时通讯应用, 基于 lavas PWA'}
      ],
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        sendContent: ''
      }
    },
    methods: {
      onSend() {
        console.log('发送')
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }
  }
  }
</script>

<style lang="stylus" scoped>
.dialog 
  &-footer
    position fixed
    bottom 0
    width 100vw

  &-content
    border-top 46px solid white

  &__item
    padding 1vh 0

    &__info
      &--right
        .van-col
          float right
    
    &__content
      padding-left 10px

      &--right
        padding-right 10px

    &__message
      padding 1vh 0
      span 
        background #e1e2e3
        color #333333
        padding 12px 8px 8px 12px
        border-radius 0 10px 10px 10px
        display inline-block
        min-width 16px
        max-width 70vw
        white-space pre-wrap
    
    &__message--right
      padding 1vh 0
      span 
        background #1989fa
        color white
        padding 12px 8px 8px 12px
        border-radius 10px 0 10px 10px
        display inline-block
        min-width 16px
        max-width 70vw
        white-space pre-wrap


</style>
