<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="dialog-area">
      <button @click="showToast">toast</button>
      <button @click="showDefault">show-defalut</button>
      <button @click="showDialog">dialog-warnning</button>

      <button @click="showDialogError">show-error</button>
      <button @click="showDialogSuccess">show-sucess</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showToast () {
      this.$toast({
        msg: '请填写您的昵称',
        type: 'warnning',
        duration: 1000
      })
    },
    showDefault () {
      this.$confirm()
    },
    showDialog () {
      this.$confirm({
        type: 'warnning',
        title: '我是提示哈哈',
        confirmText: '对，很确定',
        cancelText: '取消了吧',
        content: '确定取消关注么？',
        confirm: () => {
          console.log('This is from app.vue')
          this.$close()
          this.showDefault()
        },
        cancel: () => {
          console.log('我就不管')
          this.$close()
        }
      })
    },
    showDialogError () {
      this.$confirm({
        type: 'error',
        title: '错误',
        confirmText: '确实是我的错',
        cancelText: 'NO，我不承认',
        content: '您的机器发生错误，是否承认！',
        confirm: () => {
          console.log('算你能承认错误！')
          this.$close()
        },
        cancel: () => {
          console.log('不承认!')
          this.$close()
        }
      })
    },
    showDialogSuccess () {
      // this.$confirm({
      //   type: 'success',
      //   title: '恭喜恭喜~',
      //   content: '恭喜您，获得我们提供的一毛钱大奖！请即时联系相关客服人员，领取奖励！',
      //   confirmText: '确认领取',
      //   confirm: () => {
      //     console.log('哈哈')
      //     this.$close()
      //   }
      // })
      this.$showConsole();
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
</style>
