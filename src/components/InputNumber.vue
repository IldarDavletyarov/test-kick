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

const MAX_FRACTION_DIGITS = 8;

const transformCommaToDot = (v) => v.replace(',', '.');

const transformLimitFractionDigits = (v) => {
  const separator = '.';
  if (!v.includes(separator)) {
    return v;
  }
  let split = v.split(separator);
  let fraction = split[split.length - 1].slice(0, MAX_FRACTION_DIGITS);
  return [split.slice(0, split.length - 1), fraction].join(separator);
}

const transforms = [
  transformCommaToDot,
  transformLimitFractionDigits,
];

const isNumber = (str) => {
  if (typeof str != 'string') return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

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
      let value = event.target.value || '';

      if (!isNumber(value)) {
        event.target.value = this.value; // previous valid number
        return;
      }
      if (typeof value === 'number') {
        console.log(value, this.value);
      }

      transforms.forEach(t => {
        value = t(value);
      });
      event.target.value = value;
      this.$emit('input', value);
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