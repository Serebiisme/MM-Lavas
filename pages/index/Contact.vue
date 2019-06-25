<template>
  <div class="container container--tab container--nav background scroll-view">
    <van-nav-bar
      title="M友录"
      fixed
      :border="false"
    />
    <van-search placeholder="请输入搜索关键词" v-model="searchValue" shape="round" />

    <div class="contact">
      <van-index-bar>
        <!-- 遍历结构 -->
        <van-index-anchor index="A" />
        <van-cell clickable>
          <van-image
            class="border-radius border-radius--round"
            slot="icon"
            width="36"
            height="36"
            src="https://www.agri35.com/UploadFiles/img_0_1038717850_1641854394_26.jpg"
          />
          <van-row slot="title" class="height--full">
            <van-col offset='1' span="12" class="font-size--17">Karina</van-col>
          </van-row>
        </van-cell>
        <!-- 遍历结构 -->
        
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="B" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="C" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="D" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />
      </van-index-bar>
    </div>
  </div>
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
        searchValue:''
      }
    },
  }
</script>

<style lang="stylus" scoped>
.contact
  /deep/ .van-index-anchor--sticky
    top 46px
    
</style>