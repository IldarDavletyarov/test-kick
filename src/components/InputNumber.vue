<template lang="pug">
.input-number(@keyup.up="onUp" @keyup.down="onDown")
  .label {{ label }}
  input(:placeholder="placeholder" :value="value" @input="onInput" @keyup.up.prevent @keyup.down.prevent)
  .rate {{ rate }}
  .arrows
    .up(@click.stop="onUp")
      chevron-up
    .down(@click.stop="onDown" :class="{ 'disable': isDownDisable }")
      chevron-down
</template>
<script>
import ChevronUp from '../icons/chevron-up.vue';
import ChevronDown from '../icons/chevron-down.vue';

const MAX_FRACTION_DIGITS = 8;

const SEPARATOR = '.';

const commaToDot = (v) => v.replace(',', SEPARATOR);

const limitFractionDigits = (v) => {
  if (!v.includes(SEPARATOR)) {
    return v;
  }
  let split = v.split(SEPARATOR);
  let fraction = split[split.length - 1].slice(0, MAX_FRACTION_DIGITS);
  return [split.slice(0, split.length - 1), fraction].join(SEPARATOR);
}

const transforms = [
  commaToDot,
  limitFractionDigits,
];

const getFractions = (value) => {
  const valueString = value.toString();
  if (!valueString.includes(SEPARATOR)) {
    return 0;
  }
  const split = valueString.split(SEPARATOR);
  return split[split.length - 1].length;
}

const isNumber = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str)) || str === ''
}

const isPositive = (v) => +v >= 0;

const isOnLimitFraction = (v) => getFractions(v) <= MAX_FRACTION_DIGITS

const validations = [
  isNumber,
  isPositive,
  isOnLimitFraction,
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
      return getFractions(this.value);
    },
    fractionTick() {
      if (this.fractionDigits === 0) {
        return 1;
      }

      return this.getTickByFractions(this.fractionDigits);
    },
    isDownDisable() {
      console.log(this.value);
      return ['', '0', 0].find(v => this.value);
    },
  },
  methods: {
    update(newValue) {
      if (!validations.map(v => v(newValue)).every(v => v)) {
        return;
      }
      this.$emit('input', newValue);
    },
    getTickByFractions(fractions) {
      return +(`0.${new Array(fractions - 1).fill(0).join('')}1`);
    },
    onUp() {
      console.log(this.value, this.fractionDigits);
      const newValue = (+this.value + this.fractionTick).toFixed(this.fractionDigits);
      this.update(newValue);
    },
    onDown() {
      if (this.isDownDisable) {
        return;
      }
      let value = +this.value;
      if (value === this.fractionTick) { // value like 0.0..01
        value = (+this.value - this.getTickByFractions(this.fractionDigits + 1)).toFixed(this.fractionDigits + 1);
      } else {
        value = (+this.value - this.fractionTick).toFixed(this.fractionDigits);
      }
      this.update(value);
    },
    onInput(event) {
      let value = event.target.value || '';

      if(value === '') {
        this.update(value);
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
      this.update(value);
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
      &.disable
        background #e0e0e0  
    .up
      border-bottom 1px solid #d0d0d0
</style>