<template lang="pug">
.input-number
  .label {{ label }}
  input(:placeholder="placeholder" :value="value" @input="onInput")
  .rate {{ rate }}
  .arrows
    .up
      chevron-up
    .down
      chevron-down
</template>
<script>
import ChevronUp from '../icons/chevron-up.vue';
import ChevronDown from '../icons/chevron-down.vue';
export default {
  components: {
    ChevronUp,
    ChevronDown,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rate: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String],
      default: '',
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.value);
    },
  },
};
</script>
<style lang="stylus">
.input-number
  display flex
  align-items center
  height 40px
  width min-content
  border 1px solid #d0d0d0
  border-radius 2px
  .label
    color #d0d0d0
    margin-left 8px
  .rate
    color #c5c5c5
    margin-right 4px
  input
    -webkit-appearance none
    outline none
    border none
    text-align right
    &:-webkit-autofill
      background #fff !important
  .arrows
    height 100%
    .up
    .down
      display flex
      align-items center
      justify-content center
      background #f0f0f0   
      border-left 1px solid #d0d0d0
      height 50%
      width 24px
      box-sizing border-box
      cursor pointer
    .up
      border-bottom 1px solid #d0d0d0
</style>