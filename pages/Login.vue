<template>
  <section class="conatiner container--nav">
    <!-- <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    /> -->
    <van-nav-bar title="登录"/>
    <div>
      <van-cell-group>
        <van-field v-model="account" clearable type="tel" label="手机号" placeholder="请输入注册手机"/>
        <van-field v-model="password" clearable type="password" label="密码" placeholder="请输入密码"/>
      </van-cell-group>
      <br/>
      <van-button type="default" @click="login">登录</van-button>
      <van-button type="default" @click="register">注册</van-button>
    </div>
  </section>
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
  created() {
    console.log('%c您已进入: 「登录页」','color: #e74c3c')
  },
  data() {
    return {
      account:'',
      password:''
    }
  },
  methods: {
    async login() {
      const { account, password } = this;
      try {
        const res = await this.$post('/app/login',{
          telephone: account,
          password
        })
        console.log('res', res)
        this.$store.dispatch('user/setUser', res.data);
        // this.$router.push({
        //   name: 'socketId',
        //   query: {
        //     id: res.data.id
        //   },
        //   params: {
        //     user: res.data,
        //     id: res.data.user_id
        //   }
        // })
        this.$router.replace({
          path: '/',
        })
      } catch (error) {
        console.log(error)
      }
    },
    register() {
      this.$router.push({
        name:'register'
      })
    }
  },

}
</script>

<style lang="stylus" scoped>



</style>

