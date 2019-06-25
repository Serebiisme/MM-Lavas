<template>
  <div class="container">
    <router-view />
    <van-tabbar route v-model="active" :safe-area-inset-bottom="true">
      <van-tabbar-item name="message" :icon="active === 'message' ? 'chat' : 'chat-o'" replace to="/">消息</van-tabbar-item>
      <van-tabbar-item name="contact" :icon="active === 'contact' ? 'friends' : 'friends-o'" replace to="/contact">M友</van-tabbar-item>
      <van-tabbar-item name="live" :icon="active === 'live' ? 'smile-comment' : 'smile-comment-o'" replace to="/live">动态</van-tabbar-item>
      <van-tabbar-item name="mine" :icon="active === 'mine' ? 'manager' : 'manager-o'" replace to="/mine">我的</van-tabbar-item>
    </van-tabbar>
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
        active: 0
      }
    },
    watch: {
      active(n,o) {
        console.log(n,o)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>