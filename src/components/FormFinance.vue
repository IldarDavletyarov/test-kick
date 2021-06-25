<template lang="pug">
.form-finance
  .header
    pocket-purse
    .finance
      .line.kick
        .value {{ finance.kick }}
        .label KICK
      .line.value
        .value {{ finance.value }}
        .label {{ rate }}
  .content      
    .inputs
      input-number(label="Price" :rate="rate" v-model="price")
      input-number(label="Amount" rate="KICK" v-model="amount")
      input-number(label="Total ~" :rate="rate" v-model="total")
  .footer
    .actions
      button.buy BUY
      button.sell SELL
</template>
<script>
import InputNumber from './InputNumber.vue'
import PocketPurse from '../icons/pocket-purse.vue';

import { transforms } from '../utils';
import WithoutWatcherMixin from '../utils/withoutWatcherMixin';

export default {
  components: {
    InputNumber,
    PocketPurse,
  },
  data: () => ({
    price: '',
    amount: '',
    total: '',
    rate: 'ETH',

  }),
  mixins: [WithoutWatcherMixin],
  watch: {
    price() {
      this.updateTotal();
    },
    amount() {
      this.updateTotal();
    },
    total() {
      this.updateAmount();
    },
  },
  computed: {
    finance() {
      return this.$store.state.finance;
    },
  },
  methods: {
    updateTotal() {
      if (this.price === 0 || this.amount === 0) {
        this.total = 0;
        return;
      }

      if (this.price === '' || this.amount === '') {
        this.total = '';
        return;
      }

      let total = (this.price * this.amount).toString();

      transforms.forEach(t => {
        total = t(total);
      });
      this.$withoutWatchers(() => { // awoid trigger total watcher
        this.total = total;
      });
    },
    updateAmount() {
      if (this.total === 0) {
        this.amount = 0;
        return;
      }

      if (this.total === '') {
        this.total = '';
        return;
      }

      let amount = (this.total / this.price).toString();

      transforms.forEach(t => {
        amount = t(amount);
      });

      this.$withoutWatchers(() => { // awoid trigger amount watcher
        this.amount = amount;
      });
    }
  },
};
</script>
<style lang="stylus">
.form-finance
  width 350px
  .header
    display flex
    width 100%
    margin-bottom 16px
    .finance .line
      display flex
      margin-left 16px
      div:not(:first-child)
        margin-left 6px
  .content
    margin-bottom 24px  
    .inputs
      .input-number
        width 350px
        &:not(:last-child)
          margin-bottom 12px
  .footer
    width 100%
    .actions
      display grid
      grid-template-columns 2fr 1fr
      grid-column-gap 12px
      width 100%

      button
        border-radius 4px
        height 36px
        font-size 16px
        &.buy
          background #20ab00
          border 2px solid #20ab00
          color #fff
        &.sell
          background #fff
          border 2px solid red
          color red
</style>