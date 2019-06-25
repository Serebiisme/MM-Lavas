<template>
  <div class='van-image-viewer'>
    <!-- <van-row :gutter='5'>
      <van-col span="18" offset="4">
        <van-image
          src="http://5b0988e595225.cdn.sohucs.com/images/20190523/22bc6f022b054360a6633efb00bcff8c.jpeg"
        />
      </van-col>
    </van-row>
    <br> -->
    <van-row :gutter='10'>
      <van-col :span="computedSpan(index)" :offset="computedOffset(index)" v-for="(image,index) in images" :key="images.id || index">
        <van-image
          class="border-radius--4"
          :src="image.url || images"
          @click="imageClick(image,index, images)"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: 'van-image-viewer',
    props: {
      images: {
        type: Array,
        default: function () {
          return []
        },
        required: true
      }
    },
    computed: {
      count() {
        return this.images.length
      },
    },
    methods: {
      computedSpan(index) {
        // console.log(index,this.count)
        const map = [
          [18,9,6,9,9,6,9,9,6],
          [0,9,6,9,9,6,9,9,6],
          [0,0,6,9,6,6,6,6,6],
          [0,0,0,9,6,6,6,6,6],
          [0,0,0,0,6,6,6,6,6],
          [0,0,0,0,0,6,9,6,6],
          [0,0,0,0,0,0,9,6,6],
          [0,0,0,0,0,0,0,6,6],
          [0,0,0,0,0,0,0,0,6],
        ]
        return map[index][this.count - 1]
      },
      computedOffset(index) {
        switch (index + 1) {
          case 1:
            return 1;
            break;
          case 3:
            if (this.count > 3 && this.count !== 6 && this.count !== 9) {
              return 1
            }
            break;
          case 4:
            if (this.count === 6 || this.count === 9) {
              return 1
            }
            break;
          case 6:
            if (this.count === 7 || this.count === 8) {
              return 1
            }
            break;
          case 7:
            if (this.count === 9) {
              return 1
            }
            break;
          default:
            return 0
            break;
        }
      },
      imageClick(image,index, images) {
        // console.log('image--->', image);
        this.$emit('imageClick', arguments);
      }
    },
    created() {
      console.log('哈哈哈,我来啦,传入图片数量：', this.count)
    }
  }
</script>

<style lang="stylus" scoped>

</style>