<template lang="pug">
.form-finance(@keyup.enter="buy" @keyup.delete="sell")
  .header
    pocket-purse
    .finance
      .line.kick
        .value {{ finance.kick }}
        .label KICK
      .line.eth
        .value {{ finance.eth }}
        .label {{ rate }}
  .content      
    .inputs
      input-number(label="Price" :rate="rate" v-model="price")
      input-number(label="Amount" rate="KICK" v-model="amount")
      input-number(label="Total ~" :rate="rate" v-model="total")
  .footer
    .actions
      button.buy(@click="buy" :disabled="isActionsDisable") BUY
      button.sell(@click="sell" :disabled="isActionsDisable") SELL
</template>
<script>
// @todo: Fix paths with alias: avoid ../
import InputNumber from './InputNumber.vue';
import PocketPurse from '../icons/pocket-purse.vue';

import { transforms } from '../utils';
import WithoutWatcherMixin from '../utils/withoutWatcherMixin';

let mockFinance = {
  kick: 1000,
  eth: 100000,
};

const buyApi = async (payload) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('buy kicks 😈');
      resolve();
    }, 100);
  });
  mockFinance = { kick: mockFinance.kick + +payload.kick, eth: mockFinance.eth - payload.eth };

  return mockFinance;
};

const sellApi = async (payload) => {
    await new Promise((resolve) => {
    setTimeout(() => {
      console.log('sell your kicks 🥺');
      resolve();
    }, 100);
  });
  mockFinance = { kick: mockFinance.kick - +payload.kick, eth: +mockFinance.eth + +payload.eth };

  return mockFinance;
};

const actualFinance = () => mockFinance;

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
    isActionsDisable() {
      return [this.price, this.amount].some(v => v === '' || v === 0);
    },
  },
  mounted() {
    this.$store.dispatch('updateFinance', actualFinance());
  },
  methods: {
    async buy() {
      if (this.isActionsDisable) {
        return;
      }
      const newFinance = await buyApi({ kick: this.amount, eth: this.total, price: this.price, });
      this.$store.dispatch('updateFinance', newFinance);
    },
    async sell() {
      if (this.isActionsDisable) {
        return;
      }
      const newFinance = await sellApi({ kick: this.amount, eth: this.total, price: this.price });
      this.$store.dispatch('updateFinance', newFinance);
    },
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
      this.$withoutWatchers(() => { // avoid trigger total watcher
        this.total = total;
      });
    },
    updateAmount() {
      if (this.total === 0) {
        this.amount = 0;
        return;
      }

      if (this.total === '') {
        this.$withoutWatchers(() => { // avoid trigger amount watcher
          this.amount = '';
        });
        return;
      }

      let amount = (this.total / this.price).toString();

      transforms.forEach(t => {
        amount = t(amount);
      });

      this.$withoutWatchers(() => { // avoid trigger amount watcher
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
        cursor pointer
        &.buy
          background #20ab00
          color #fff
          &:disabled
            background #156702
        &.sell
          background #fff
          border 2px solid red
          color red
          &:disabled
            color #961126
            border-color #961126
</style>