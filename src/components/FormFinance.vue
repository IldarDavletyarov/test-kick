<template lang="pug">
.form-finance
  input-number(label="Price" rate="ETH" v-model="price")
  input-number(label="Amount" rate="KICK" v-model="amount")
  input-number(label="Total ~" rate="ETH" v-model="total")
</template>
<script>
import InputNumber from './InputNumber.vue'

import { transforms } from '../utils';
import WithoutWatcherMixin from '../utils/withoutWatcherMixin';

export default {
  components: {
    InputNumber,
  },
  data: () => ({
    price: '',
    amount: '',
    total: '',

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
  .input-number
    width 300px
    &:not(:last-child)
      margin-bottom 12px
</style>