<template lang="pug">
#app
  input-number(label="Price" rate="ETH")
</template>

<script>
import InputNumber from './components/InputNumber.vue'

export default {
  name: 'App',
  components: {
    InputNumber,
  }
}
</script>

<style lang="stylus">
#app
  font-family Arial, Helvetica, sans-serif
</style>
