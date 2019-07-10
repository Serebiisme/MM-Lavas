<template>
  <div class="container container--nav background scroll-view">
    <van-nav-bar
      left-text="返回"
      title="我的"
      fixed
      @click-left="$router.back()"
    />
    <section class="dialog-content">

    </section>
    <footer class="dialog-footer">
      <van-search 
        left-icon=''
        placeholder="请输入发送消息内容" 
        v-model="sendContent" 
        shape="round" 
        show-action
        clearable
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
        messages: [],
        sendContent: ''
      }
    },
    methods: {
      onSend() {
        console.log('发送')
      }
    },
  }
</script>

<style lang="stylus" scoped>
.dialog 
  &-footer
    position fixed
    bottom 0
    width 100vw

</style>
