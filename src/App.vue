<template lang="pug">
#app
  form-finance
</template>

<script>
import FormFinance from './components/FormFinance.vue'

export default {
  name: 'App',
  components: {
    FormFinance,
  }
}
</script>

<style lang="stylus">
#app
  font-family Arial, Helvetica, sans-serif
button {
  background: transparent;
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  text-shadow: 0px 0px 0px transparent;
}

button:hover {
  background: transparent;
  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  text-shadow: 0px 0px 0px transparent;
}

button:active {
  outline: none;
  border: none;
}

button:focus {
  outline: 0;
}
</style>
