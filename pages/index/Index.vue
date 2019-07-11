<template>
  <div class="container container--tab container--nav background">
    <van-nav-bar
      title="MM"
      fixed
      :border="false"
    />
    <van-search class="" placeholder="请输入搜索关键词" v-model="searchValue" shape="round" />
    <!-- 结构 -->
    <van-swipe-cell :right-width="60" class="chat-item" v-for="(item, index) in chaters" :key="index">
      <div slot="left"></div>
      <van-cell :border="true" clickable>
        <van-image
            class="border-radius border-radius--round"
            slot="icon"
            width="48"
            height="48"
            src="http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg"
          />
          <van-row type="flex" justify="space-between">
            <van-col offset='1' span="18">
              <van-row class="chat-item__name font-size--17">Karina</van-row>
              <van-row class="chat-item__description">也不知道说了什么sdasdads反正就说了那么多</van-row>
            </van-col>
            <van-col span="4">17:56</van-col>
          </van-row>
      </van-cell>
      <van-button
        class="height--full"
        square
        slot="right"
        type="danger"
        text="删除"
      />
    </van-swipe-cell>
    <!-- 结构 -->
    <van-dialogitem
      @item-click="showDialogDetail"
      @delete-click="beforedDelete"
      avatar="https://b-ssl.duitang.com/uploads/item/201610/02/20161002085407_wSCsx.thumb.700_0.jpeg"
      name="Serebii"
      content="我也不知道说些什么"
      :timestamp="$moment(Date.now()).format('HH:ss')"
    />
  </div>
</template>

<script>
  import DialogItem from '@/components/DialogItem';
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
      [DialogItem.name]: DialogItem
    },
    data() {
      return {
        searchValue:'',
        chaters: Array(1)
      }
    },
    methods: {
      jump() {
        this.$router.push({
          name: 'login'
        })
      },
      showDialogDetail() {
        this.$router.push({
          name: 'dialogId',
          params: {
            id: 1
          }
        })
      },
      beforedDelete() {
        return false
      },
    },
  }
</script>

<style lang="stylus" scoped>
.chat-item
  &__name
    font-weight 500
  &__description
    color #666
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    width 62vw
</style>