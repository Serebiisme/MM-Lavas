<template>
  <div class="container container--nav__without container--tab scroll-view">
    <header class="live-header">
      <van-image
        width="100%"
        fit="contain"
        src="http://img5.imgtn.bdimg.com/it/u=2545359049,4147091084&fm=26&gp=0.jpg"
        class="person-background"
      />
      <van-image
        width="5rem"
        height="5rem"
        class="border-radius border-radius--round person-avatar"
        fit="cover"
        src="http://img2.woyaogexing.com/2017/05/26/78f91687b634c993!600x600.jpg"
      />
    </header>

    <section class="live-content">
      <ul>
        <li>
          <!-- 可以提组件 -->
          <van-cell :border="true" clickable @click="itemClick">
            <van-image
              class="border-radius border-radius--round"
              slot="icon"
              width="48"
              height="48"
              src="http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg"
            />
            <van-row type="flex" justify="space-between">
              <van-col offset='1' span="24">
                <van-row class="chat-item__name font-size--17" type="flex" justify="space-between">
                  <van-col class="live-content__item__name">Karina</van-col>
                  <van-col class="live-content__item__time">
                    <span>
                      <van-icon name="clock" size="17px" style="transform: translateY(3px);"/>
                    </span>
                    <span>17:54</span>
                  </van-col>
                </van-row>
                <van-row class="chat-item__description">也不知道说了什么反正就说了那么多也不知道说了什么反正就说了那么多</van-row>
              </van-col>
            </van-row>
            <van-image-viewer
              :images='images'
              @imageClick="imageClick"
            />
          </van-cell>
          
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ImageViewer from '@/components/ImageViewer';
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
      [ImageViewer.name]: ImageViewer
    },
    data() {
      return {
        images: [
          'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
          // 'http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg',
        ].map((i,index) => ({
          id: Date.now() + index,
          url: i
        }))
      }
    },
    methods: {
      itemClick() {
        console.log('item--->');
      },
      imageClick(image,index,images) {
        console.log('image--->', image,index,images);
      }
    },
  }
</script>

<style lang="stylus" scoped>
.person
  &-avatar
    position absolute
    right 1.2rem
    transform translateY(-80%)
    border 3px solid #fff

  &-background
    filter blur(0.5px)
    &::after
      content 'Karina'
      position absolute
      font-weight 600
      color #fff
      font-size 24px
      right 8rem
      transform translateY(-2rem)

.live
  &-header
    position: relative
  &-content
    margin-top 2rem

    &__item
      &__name
        color #1989fa
      &__time
        color #999

/* vant 样式覆盖 */
.van-cell:not(:last-child):after 
  border-bottom: 1px solid transparent;

</style>