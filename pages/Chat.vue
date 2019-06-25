<template>
  <div>
    <p>--以下为内容发送区--</p>
    <van-cell-group>
      <!-- <van-field v-model="target" clearable label="目标" placeholder="请输入发送对象"/>
      <van-field v-model="room" clearable label="房间" placeholder="请输入发送的房间"/> -->
      <van-field v-model="message" clearable label="消息" placeholder="请输入发送消息"/>
    </van-cell-group>
    <br/>
    <van-button type="default" @click="submit">提交</van-button>
    <van-button type="default" @click="clearList">清空</van-button>
    <!-- 功能测试按钮 -->
    <van-button v-if="!isSingle && user.roles.indexOf(1) !== -1" type="danger" @click="poll">发起投票</van-button>

    <br/>
    <p>--以下为接收到消息--</p>
    <div>
      <van-row
          v-for="item in list"
          :key="item.key"
        >
          <div v-if="item.isSelf">
            <van-col span="18">消息:{{ item.msg }}</van-col>
            <van-col span="6">账号:{{ item.id }}</van-col>
          </div>

            <div v-else>
            <van-col span="6">账号:{{ item.id }}</van-col>
            <van-col span="18">消息:{{ item.msg }}</van-col>
          </div>

        </van-row>
    </div>
    <van-button @click="haha">哈哈</van-button>
    
    <!-- 投票dialog -->

    <van-dialog
      v-model="pollVisiable"
      title="投票"
      @confirm="confirmPoll"
    >
      <van-radio-group v-model="pollRes">
        <van-radio v-for="item in pollItems" :key="item.value"  :name="item.value">{{item.label}}</van-radio>
      </van-radio-group>
    </van-dialog>

    <van-dialog
      v-model="pollResVisiable"
      title="投票"
    >
    <div v-for="(value,key) in pollCount" :key="value">
      <span>{{key}}:</span>
      <span>{{value}}</span>
    </div>
    </van-dialog>

  </div>
</template>
<script>
import { mapState } from 'vuex';
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
      const { id, isSingle, room } = this.$route.params;
      console.log('id',id);
      console.log('isSingle',isSingle)
      this.isSingle = isSingle;
      this.target = isSingle ? id : room;

      console.log('user-->', this.user);

      // this.$on('notification', function (msg) {
      //   console.log('收到notification', msg);
      // })

      this.$socket.on('notification', msg => {
        console.log('msg',msg);
        const { action, payload } = msg.data;
        switch (action) {
          case 'PUBLISH_POLL':{
            const { target_role } = payload;
            const ifRes = this.intersection(this.user.roles, target_role).length > 0;
            console.log('ifRes',ifRes, this.user.id,target_role);
            if (ifRes) {
              const { items } = payload.poll;
              this.pollItems = items;
              this.pollVisiable = true;
              console.log('需要响应事件');
            } 
            console.log('收到投票请求');
            break;
          }
          case 'CONFIRM_POLL': {
            const { target_role } = payload;
            const ifRes = this.intersection(this.user.roles, target_role).length > 0;
            if (ifRes) {
              console.log(payload);
              const { poll_item } = payload;
              this.pollCount[poll_item] = this.pollCount[poll_item] + 1;
              console.log('需要响应事件');
            } 
            console.log('收到投票结果');
            break;
          }
          default:
            break;
        }
      })
    },
    data() {
      return {
        target:'',
        message: '',
        room: '',
        // list: [], 

        isSingle: false,
        pollVisiable: false,
        pollItems: [],
        pollRes: null,
        pollResVisiable: false,
        pollCount: {
          '1':0,
          '2':0,
          '3':0
        }
      }
    },
    computed: {
      ...mapState('chat', {
        recordList: 'recordList'
      }),
      ...mapState('user', {
        user: 'user'
      }),
      list() {
        const key = this.isSingle ? `single-${ [this.target, this.user.id].sort().join('_') }` : this.target;
        return this.recordList[key] ? this.recordList[key].list : []
      }
    },
    methods: {
      // 交集
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
      // 确认投票
      confirmPoll() {
        console.log('发出投票结果');
        this.$socket.emit('room', {
          action: 'CONFIRM_POLL',
          payload: {
            from: this.user.id,
            poll_item: this.pollRes,
            target_role: [1],
          },
          room: this.target
        })
      },
      // 发起投票
      poll() {
        this.pollResVisiable = true;
        this.$socket.emit('room', {
          action: 'PUBLISH_POLL',
          payload: {
            target_role: [2],
            poll: {
              items: [{
                label: '选项一',
                value: 1
              },{
                label: '选项二',
                value: 2
              },{
                label: '选项三',
                value: 3
              }]
            }
          },
          room: this.target
        })
      },
      clearList() {
        console.log('清空');
        this.$store.dispatch('chat/clearChatList', { id: this.$socket.id, target: this.target, isSingle: this.isSingle });
      },
      haha() {
        const state = this.$store.state.chat;
        console.log(this.list);
        console.log(this.user)
        console.log(state);
      },
      submit() {
        console.log('提交信息');
        const record = {
          key: Date.now(),
          id: this.$socket.id, // 自己
          targetId: this.target, // 对方
          msg: this.message,
          extra:{},
          isSelf: true
        }
        if (this.isSingle) {
          // 单聊
          // 把自己的消息加入聊天记录
          this.$store.dispatch('chat/addSingleRecord', {
            record,
          })
          // 发送消息
          this.$socket.emit('chat', {
            action: 'SINGLE_CHAT',
            target: this.target,
            room: this.room,
            payload: {
              msg: this.message,
            },
          });
        } else {
          // 群聊
          console.log('发送群聊信息',this.target);
          this.$socket.emit('chat', {
            action: 'GROUP_CHAT',
            target: null,
            room: this.target,
            payload: {
              msg: this.message,
            },
          });
        }
      },
      initMetaInfo() {

      }
    },

  }
</script>