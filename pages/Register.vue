<template>
  <section class="conatiner">
    <div class="conatiner__content">
      <van-cell-group>
        <van-field  
          v-model="account" 
          type="tel"
          required 
          clearable 
          label="手机号" 
          :maxlength="11"
          placeholder="请输入注册手机"
          :error-message="accountValidate ? '' : '手机号格式错误'"
          @input="debounce(onAccountChange,500)"
        />
        <van-field 
          v-model="password" 
          :type="pswVisiable ? 'text' : 'password'" 
          required 
          clearable 
          label="密码" 
          :maxlength="11"
          :right-icon="pswVisiable ? 'eye-o' : 'closed-eye'"
           @click-right-icon="pswVisiable = !pswVisiable"
          placeholder="请输入20位长度内密码"
        />
        <van-field
          v-model="verifyCode"
          center
          required
          clearable
          :maxlength="4"
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" type="primary" @click="onGetVerifyCode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <br/>
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
    data() {
      return {
        account:'',
        password:'',
        verifyCode:'',

        pswVisiable: false,
        accountValidate: true
      }
    },
    methods: {
      async register() {
        console.log('注册');
        try {
          const res = await this.$post('/app/register', {
            telephone: this.account,
            password: this.password,
            code: this.verifyCode
          })
          this.$router.push({
            name: 'bind',
            params: {
              user_id: res.data.id
            }
          })
        } catch (error) {
          console.log(error);
        }

      },
      debounce(fn, duration) {
        return function() {
          clearTimeout(fn.timerId);
          fn.timerId = setTimeout(fn,duration);
        }()
      },
      onAccountChange() {
        this.accountValidate = /^1[34578]\d{9}$/.test(this.account);
      },
      async onGetVerifyCode() {
        if (!this.account) {
          return this.$notify('请输入手机号!')
        }
        const res = await this.$get('/app/vcode',{
          params: {
            telephone: this.account
          }
        })
        this.$toast(`验证码:${res.data.code}`);
      }
    },
}
</script>

<style lang="stylus" scoped>
.conatiner
  display flex
  justify-content center
  align-items center
  flex-direction column
  &__content 
    width 100vw
</style>

