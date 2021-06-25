<template lang="pug">
.input-number(@keyup.up="onUp" @keyup.down="onDown")
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

const SEPARATOR = '.';

const transformCommaToDot = (v) => v.replace(',', SEPARATOR);

const transformLimitFractionDigits = (v) => {
  if (!v.includes(SEPARATOR)) {
    return v;
  }
  let split = v.split(SEPARATOR);
  let fraction = split[split.length - 1].slice(0, MAX_FRACTION_DIGITS);
  return [split.slice(0, split.length - 1), fraction].join(SEPARATOR);
}

const transforms = [
  transformCommaToDot,
  transformLimitFractionDigits,
];

const isNumber = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str))
}

const isPositive = (v) => +v >= 0;

const validations = [
  isNumber,
  isPositive,
];

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
  computed: {
    fractionDigits() {
      const split = this.value.toString().split(SEPARATOR);
      return split[split.length - 1].length;
    },
  },
  methods: {
    onUp() {
      
    },
    onDown() {

    },
    onInput(event) {
      let value = event.target.value || '';
      console.log(value);

      if(value === '') {
        this.$emit('input', value);
        return;
      }

      if (!validations.map(v => v(value)).every(v => v)) {
        event.target.value = this.value; // previous valid number
        return;
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