<template>
  <div class="container">
    <van-button type="default" @click="exit">退出</van-button>
    <br/>
    <p>--以下为内容发送区--</p>
    <img :src="user.avatar" alt="" srcset="" width="100" height="100">
    <van-cell title="姓名" :value="user.name"/>
    <van-cell title="ID" :value="user.id"/>
    <br/>
    <p>--以下为操作区--</p>
    <van-button type="default" @click="(chatVisiable = true, isSingle = true)">发起单聊</van-button>
    <van-button type="default" @click="(chatVisiable = true, isSingle = false)">发起群聊</van-button>
    <br/>
    <p>--以下为聊天列表--</p>
    <div>
      <van-list>
        <van-cell
          clickable
          v-for="item in list"
          :key="item"
          :title="'对象:' + item"
          @click="routerToDetail(item)"
        />
      </van-list>
    </div>

    <van-dialog
      v-model="chatVisiable"
      :title="isSingle ? '发起单聊' : '发起群聊'"
      show-cancel-button
      @confirm="enterChatDetail"
    >
      <van-field
        v-model="targetID"
        clearable
        :label="isSingle ? '用户ID' : '房间ID'"
        :placeholder="isSingle ? '请输入用户ID' : '请输入房间ID'"
      />
    </van-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Vue from 'vue';
import { mapState } from 'vuex'
import cookieHandler from '@/js/util';

export default {
  data() {
    return {
      // list: [],
      socket: null,

      // user: {
      //   avatar: '',
      //   name: '',
      //   id: null,
      // },

      chatVisiable: false,
      isSingle: true,
      targetID: ''
    }
  },
  computed: {
    ...mapState('user', {
      user: 'user'
    }),
    ...mapState('chat', {
      recordList: 'recordList'
    }),
    list() {
      const arr = Object.keys(this.recordList);
      return arr
    }
  },
  methods: {
    intersection() {
      const args = Array.from(arguments);
      return args.reduce((pre, cur) => {
        const res = [];
        while (cur.length) {
          const item = cur.shift();
          pre.indexOf(item) !== -1 && res.push(item);
        }
        return res;
      });
    },
    // 事件是否响应
    ifEventResponse(roles) {
      return this.intersection(this.user.roles, roles).length > 0
    },
    // 处理通知消息
    handleNotification(msg) {
      console.log('处理notify');
      this.$emit('notification', msg);
    },
    routerToDetail(item) {
      console.log(item);
      const [, id_1, id_2] = item.match(/single-([0-9]+)_([0-9]+)/);
      console.log(id_1, id_2, this.user.id);
      const target_id = +id_1 === +this.user.id ? id_2 : id_1;
      console.log('target_id',target_id)
      this.$router.push({
        name: 'chat',
        params: {
          isSingle: this.isSingle,
          id: target_id
        }
      })
    },
    async enterChatDetail() {
      console.log('确认框');
      if (this.isSingle) {
        const targetInfo = await this.$get('/getUserInfo',{
          params: {
            id: this.targetID
          }
        })
        console.log('targetInfo', targetInfo);
        const chater = targetInfo.data ? targetInfo.data.chater : {};
        const target = {
          ...(targetInfo.data || {}),
          ...chater
        }
        this.$store.dispatch('chat/addSingleMeta', {
          meta: {
            [this.targetID]: target,
            [this.user.id]: this.user
          }
        })
      } else {
        // 加入群
        this.$socket.emit('room', {
          action: 'JOIN_ROOM',
          room: this.targetID
        })
      }

      this.$router.push({
        name: 'chat',
        params: {
          isSingle: this.isSingle,
          id: this.targetID,
          room: this.targetID
        }
      })
    },
    login() {
      if (this.$socket || this.socket) {
        if (this.$socket.disconnected) {
          return this.$socket.connect();
        } else {
          return this.$notify('已登录');
        }
      }
      const id = this.$route.params.id;
      const socket = io('http://127.0.0.1:7001',{
        query: {
          room: 'base',
          userId: `client_${id}`,
        },

        transports: [ 'websocket' ],
      });
      Vue.prototype.$socket = socket
      this.socket = socket;
      console.log('Socket ==>', this.socket);
      this.initSocket();
    },
    exit() {
      if (this.$socket) {
        this.$socket.disconnect();
        this.$socket.removeAllListeners();

        // this.$socket.off(this.user.id);
      } else {
        this.$notify('网络错误!')
      }
      cookieHandler.delCookie('token');
      this.$router.push('/login');
    },
    initSocket() {
      const { $socket } = this;

      $socket.on('connect', () => {
        const id = $socket.id;
        // 监听自身 id 以实现 p2p 通讯
        // $socket.on(id, msg => {
        //   console.log('#receive,', msg);
        //   const { payload } = msg.data;
        //   this.list.push(payload.msg);
        // });

        // 监听自身 id 以实现 p2p 通讯
        $socket.on(id, msg => {
          console.log('#receive,', msg);

          const { payload } = msg.data;
          const { client, target, timestamp } = msg.meta;
          const record = {
            key: timestamp,
            id: client.id,
            targetId: target.id,
            msg: payload.msg,
            extra:{},
            isSelf: false
          };
          this.$store.dispatch('chat/addSingleRecord', {
            record
          })
        });
      });

      // $socket.on('notification', msg => {
      //   // console.log('#notification,', msg);
      //   // const { payload } = msg.data;
      //   // this.list.push(payload.msg);
      //   this.handleNotification(msg);
      // })

      $socket.on('chat', msg => {
        console.log('#group chat', msg);
        const { timestamp, room, client } = msg.meta;
        const { payload } = msg.data
        const record = {
          key: timestamp,
          id: client.id, // 自己
          // targetId: this.target, // 对方
          room: room,
          msg: payload.msg,
          extra:{},
          isSelf: client.id === this.user.id
        }
        console.log('group record', record);
        this.$store.dispatch('chat/addGroupRecord', {
          record
        })
      })

      // 接收在线用户信息
      // $socket.on('online', msg => {
      //   console.log('#online,', msg);
      // });

      // 系统事件
      $socket.on('disconnect', msg => {
        console.log('#disconnect', msg);
        this.exit();
      });

      $socket.on('disconnecting', () => {
        console.log('#disconnecting');
      });

      $socket.on('error', () => {
        console.log('#error');
      });
    }
  },
  created() {
    console.log('%c您已进入: 「聊天主页」','color: #e74c3c')
    console.log('user--->', this.user);

    const token = cookieHandler.getCookie('token');
    console.log('token------>', token);
    console.log('object------>', document.cookie)
    
    // console.log(this.$route)
    // const { user } = this.$route.params;
    // this.user = {
    //   ...user,
    //   ...(user ? user.chater : {} )
    // };
    this.login();
  },
}
</script>
