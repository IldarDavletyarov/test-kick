<template lang="pug">
.form
  input-number(label="Price" rate="ETH" v-model="price")
  .test {{ price }}
</template>
<script>
import InputNumber from './InputNumber.vue'

export default {
  components: {
    InputNumber,
  },
  data: () => ({
    price: '',
  }),
};
</script>