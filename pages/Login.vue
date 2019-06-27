<template>
  <section class="conatiner container--nav">
    <!-- <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    /> -->
    <van-nav-bar title="登录" :border="false"/>
    <br/>
    <van-row type="flex" justify="center">
      <van-col span="6">
        <Skeleton/>
      </van-col>
    </van-row>
    <br/>
    <div>
        <van-field v-model="account" clearable type="tel"  placeholder="请输入注册手机"/>
      <br/>
        <van-field v-model="password" clearable :type="pswVisiable ? 'text' : 'password'" :right-icon="pswVisiable ? 'eye-o' : 'closed-eye'" placeholder="请输入密码" @click-right-icon="togglePswVisiable"/>
      <br/>
      <van-wingblank>
        <van-button type="info" size="large"  @click="login">登录</van-button>
        <van-whitespace size="lg"/>
        <van-button type="default"  size="large" @click="register">注册</van-button>
      </van-wingblank>
      <br/>
      <van-wingblank>
        <van-row type="flex" justify="end">
          <van-col span="6">忘了密码?</van-col>
        </van-row>
      </van-wingblank>
    </div>
  </section>
</template>

<script>
import Skeleton from '@/components/Skeleton';
export default {
  name: 'MM',
  metaInfo: {
    title: 'MM',
    meta: [
        { name: 'keywords', content: 'MM Chat system based on lavas PWA'},
        { name: 'description', content: 'MM 即时通讯应用, 基于 lavas PWA'}
    ],
  },
  components: {
    Skeleton
  },
  created() {
    console.log('%c您已进入: 「登录页」','color: #e74c3c')
  },
  data() {
    return {
      account:'',
      password:'',

      pswVisiable: false
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
    }, 
    togglePswVisiable() {
      this.pswVisiable = !this.pswVisiable;
    }
  },

}
</script>

<style lang="stylus" scoped>



</style>

