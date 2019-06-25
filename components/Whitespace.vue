<template>
  <div :class="'van-whitespace-' + size"></div>
</template>

<script>
export default {
  name: 'van-whitespace',
  props: {
    size: {
      default: 'md'
    }
  }
}
</script>

<style lang="stylus" scoped>
.van-whitespace-xs 
  height 3px
  width 100%

.van-whitespace-sm 
  height 6px
  width 100%

.van-whitespace-md 
  height 9px
  width 100%

.van-whitespace-lg 
  height 15px
  width 100%

.van-whitespace-xl 
  height 21px
  width 100%

</style>
