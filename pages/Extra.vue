<template>
  <div class="page-index">

    <!-- <van-list>
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
      />
    </van-list> -->
    <van-list style="width: 100%">
      <van-swipe-cell style="width: 100%" :left-width="65" :right-width="65"  v-for="item in list" :key="item.id">
        <span slot="left" @click="isEdit = true, editTarget = {...item}">编辑</span>
        <van-cell-group>
          <van-cell :title="item.name" @click="showItem(item)"/>
        </van-cell-group>
        <span slot="right" @click="deleteItem(item)">删除</span>
      </van-swipe-cell>
    </van-list>

    <br/><br/><br/>

    <div class="container">
      <van-cell-group>
        <van-field v-model="name" clearable label="姓名" placeholder="请输入用户名"/>
        <van-field v-model="age" type="number" label="年龄" maxlength='3' placeholder="请输入年龄"/>
      </van-cell-group>
      <br/>
      <van-button type="default" @click="submit">提交</van-button>
    </div>

    <van-dialog
      v-model="isEdit"
      title="编辑用户信息"
      show-cancel-button
      @confirm="editItem(editTarget)"
      @cancel="editTarget = {
        id:'',
        name:'',
        age: ''
      }"
    >
      <br/>
      <van-cell-group>
        <van-field v-model="editTarget.name" clearable label="姓名" placeholder="请输入用户名"/>
        <van-field v-model="editTarget.age" type="number" label="年龄" maxlength='3' placeholder="请输入年龄"/>
      </van-cell-group>
    </van-dialog>

    <!-- <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>

export default {
  name: "index",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s - Lavas",
    meta: [
      { name: "keywords", content: "lavas PWA" },
      {
        name: "description",
        content:
          "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
      }
    ]
  },
  data() {
    return {
      active: 0,

      name: "",
      age: "",

      isEdit:false,
      editTarget: {
        id:'',
        name:'',
        age: ''
      },

      list:[]
    };
  },
  methods: {
    // 提交用户信息
    submit() {
      const { name, age } = this.$data
      console.log('提交',name, age);
      this.$post('/users',{
        name,
        age
      }).then(res => {
        console.log('create',res);
        this.list.push(res.data);
        this.name = '';
        this.age = '';
      })
    },
    showItem(item) {
      console.log(item);
      const { id } = item;
      this.$get(`/users/${id}`).then(res => {
        console.log('show:',res)
        const { data } = res;
        this.$dialog.alert({
          title: data.name,
          message: `年龄：${data.age}岁 `
        });
      })
    },
    deleteItem(item) {
      console.log('delete',item);
      const { id } = item; 
      this.$delete(`/users/${id}`).then(res => {
        console.log('delete', res);
        const { status } = res;
        status === 200 && (this.list.splice(this.list.findIndex(i => i.id === id),1));
      })
    },
    editItem(item) {
      // console.log('edit',item);
      const { id } = item;
      const { name, age } = this.editTarget;
      this.isEdit = true;
      this.$put(`/users/${id}`,{
        name, age 
      }).then((res) => {
        console.log('res',res);
        const { data } = res;
        this.list.splice(this.list.findIndex(i => i.id === id),1,data)
      })
    }
  },
  async created() {
    // 获取用户列表
    this.$get('/users').then((result) => {
      console.log('index',result);

      this.list = result.data
    }).catch((err) => {
      
    });;
    // console.log('res--->',res); 
  },
  async asyncData({ store, route }) {
    console.log("store", store);
    console.log("route", route);
    setState(store);
  }
};
</script>

<style lang="stylus" scoped>

.container {
  width: 100%;
  height: 100%;
}

.page-index {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 46px;
    font-weight: 500;
    margin-bottom: 0;
  }

  /deep/ .van-swipe-cell {
    &__right, &__left {
      color: #fff;
      font-size: 15px;
      width: 65px;
      height: 44px;
      display: inline-block;
      text-align: center;
      line-height: 44px;
    }

    &__right { 
      background-color: #f44;
    }
    &__left {
      background-color: #1abc9c;
    }
  }
}
</style>
