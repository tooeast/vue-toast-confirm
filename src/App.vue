<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="showDialog">show</button>
    <button @click="showToast">toast</button>
    <button @click="showSide">side</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isAnimationIn: false,
      isAnimationOut: false
    }
  },
  methods: {
    showDialog () {
      this.$confirm({
        type: 'warnning',
        cancelText: 'cancel'
      })
    },
    showToast () {
      this.$toast({
        type: 'error',
        msg: 'okokokoko',
        duration: 50000
      })
    },
    showSide () {
      this.$side({
        type: 'warnning',
        msg: "warnning!!!!!!!!",
        duration: 30000
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
