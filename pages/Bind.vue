<template>
  <section>
    <van-uploader :after-read="onRead" accept="image/*" multiple>
      <van-icon name="photograph" />
    </van-uploader>
    <br />
    <img :src="avatar" alt="头像" width="100" height="100">

    <van-cell-group>
      <van-field v-model="name" label="姓名" placeholder="请输入姓名" />
      <van-cell title="生日" :value="birth || '请选择生日日期'" @click="brithdayVisiable = true" />
      <van-cell title="年龄" :value="age"/>
      <van-cell>
        <van-radio-group v-model="gender">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </van-cell>
      <van-field v-model="telephone" label="联系电话" placeholder="请输入联系电话" />
      <van-field v-model="identity" label="身份证" placeholder="请输入身份证" />

    </van-cell-group>

    <van-button type="default" @click="register">注册</van-button>

    <van-popup v-model="brithdayVisiable" position="bottom" @click-overlay="(brithdayVisiable = false, brithday = new Date(2000,0,1))">
      <van-datetime-picker
        type="date"
        v-model="brithday"
        :min-date="new Date(null)"
        :max-date="new Date()"
        @confirm="confirmBrithday"
        @cancel="(brithdayVisiable = false, brithday = new Date(2000,0,1))"
      />
    </van-popup>
  </section>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
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
      this.user_id = this.$route.params.user_id;
      console.log('%c您已进入: 「身份绑定页」','color: #e74c3c','您绑定的身份id:' + this.user_id);
    },
    data() {
      return {
        // route
        user_id: '',
        // form
        avatar: '',
        name: '',
        age: '',
        gender: '0',
        telephone: '',
        identity: '',
        brithday: new Date(2000,0,1),
        // view
        brithdayVisiable: false,
      }
    },
    methods: {
      async onRead(file, detail) {
        //创建form对象
        let params = new FormData(); 
        //通过append向form对象添加数据
        //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        params.append("file", file.file); 
        console.log('params',params);
        const res = await this.$post('/file/upload', params, {
          headers: { //添加请求头
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(res);
        this.avatar = 'http://127.0.0.1:7001' + res.data.url;
        this.$notify('上传成功!');
      },
      confirmBrithday() {
        this.brithdayVisiable = false;
        this.age = this.getAge(this.brithday);
      },
      getAge(birthday) {  
        const text = moment(birthday, 'YYYY-MM-DD').fromNow();    
        let age = parseInt(text, 10);  // 注意：parseInt(string, radix);第二个参数不能省略，否则会报Lint错误
        if (isNaN(age)) {    
          age = '未知'; 
        } 
        return age;
      },
      async register() {
        const { user_id,avatar,name,age,gender,telephone,identity,brithday, } = this;
        console.log(brithday);
        const res = await this.$post('/app/identity/bind',{ user_id,avatar,name,age,gender,telephone,identity,brithday })
        console.log(res);
      }
    },
    computed: {
      birth() {
        return moment(this.brithday).format('YYYY/MM/DD');
      }
    },
  }
</script>

<style lang="stylus" scoped>

</style>