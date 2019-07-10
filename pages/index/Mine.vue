<template>
  <div class="container tab-container--withoutNav background">
    <van-nav-bar
      title="我的"
    />
    <van-whitespace/>
    <van-cell clickable is-link class="header">
      <van-image
        class="border-radius border-radius--round"
        slot="icon"
        width="56"
        height="56"
        src="http://5b0988e595225.cdn.sohucs.com/images/20190523/463fdfdf914f4d7295eb51e91d3ee2d7.jpeg"
      />
      <van-row slot="title" class="height--full">
        <van-col offset='1' span="20" class="font-size--17">
          <van-row class="header__name">Karina</van-row>
          <van-row class="header__description font-size--12">个人描述个人描述个人描述个人描述个人描述123</van-row>
        </van-col>
      </van-row>
    </van-cell>
    <van-whitespace/>
    <van-cell title="手机号码" value='13838383888' is-link icon="phone-o"/>
    <van-cell title="修改密码" is-link icon="passed"/>
    <van-whitespace/>
    <van-cell title="使用帮助" is-link icon="notes-o"/>
    <van-cell title="意见反馈" is-link icon="records"/>
    <van-whitespace/>
    <van-cell title="关于MM" is-link icon="home-o"/>
    <van-cell title="清除缓存" value='4.56M' is-link icon="brush-o"/>
    <van-whitespace/>
    <van-button class="exit" type="danger" size="large" @click="logout" >退出登录</van-button>
  </div>
</template>

<script>
  import cookiesHandler from '../../js/util';
  export default {
    name: 'MM',
    metaInfo: {
      title: 'MM',
      meta: [
          { name: 'keywords', content: 'MM Chat system based on lavas PWA'},
          { name: 'description', content: 'MM 即时通讯应用, 基于 lavas PWA'}
      ],
    },
    methods: {
      logout() {
         this.$dialog.alert({
          title: '提示',
          message: '确定退出登录？',
          showCancelButton: true,
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              cookiesHandler.delCookie('token');
              this.$router.replace({
                name: 'login'
              })
            } else {
              done();
            }
          }
        });
      }
    },
  }
</script>

<style lang="stylus" scoped>
.header
  display flex
  align-items center

  &__name
    font-size 22px
    font-weight 500
    margin-bottom 3px

  &__description
    color #666
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    width 65vw;

.exit
  transform: scale(0.9);

.van-cell__left-icon 
    margin-right 10px

</style>