<template>
    <van-swipe-cell :right-width="60" class="chat-item" @click="cellClick">
      <div slot="left"></div>
      <van-cell :border="true" clickable>
        <van-image
            class="border-radius border-radius--round"
            slot="icon"
            width="48"
            height="48"
            :src="avatar"
          />
          <van-row type="flex" justify="space-between">
            <van-col offset='1' span="18">
              <van-row class="chat-item__name font-size--17">{{name}}</van-row>
              <van-row class="chat-item__description">{{content}}</van-row>
            </van-col>
            <van-col span="4">{{timestamp}}</van-col>
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
</template>

<script>
  export default {
    name: 'van-dialogitem',
    props: {
      avatar: {
        type: String,
        default: 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg'
      },
      name: {
        type: String,
        default: '火星M友',
        required: true
      },
      content: {
        type: String,
        default: '此处省略10000字节的火星语...',
        required: true
      },
      timestamp: {
        type: String,
        default: '13:14',
        required: true
      }
    },
    methods: {
      cellClick(clickPosition, instance) {
      switch (clickPosition) {
        case 'outside':
        case 'left':
          break;
        case 'cell':
          this.$emit('item-click')
          break;
        case 'right':
          this.$emit('delete-click');
          this.$parent.
          break;
      }
    }
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