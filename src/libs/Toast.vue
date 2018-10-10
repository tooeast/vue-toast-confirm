<template>
  <div class="vdialog">
    <div class="mask"></div>
    <div class="area" @click="closeDialog">
      <i class="top-icon" :class="getShowType"></i>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vdialog',
  props: {
    msg: {
      type: String
    },
    type: {
      type: String
    },
    duration: {
      type: Number
    }
  },
  computed: {
    getShowType () {
      return `icon-${this.type}`
    },
    getDuration () {
      return this.duration
    }
  },
  mounted () {
    setTimeout(() => {
      this.timeLine()
    })
  },
  methods: {
    timeLine () {
      setTimeout(() => {
        this.closeDialog()
      }, this.getDuration)
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.vdialog {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100;
  }

  .area {
    display: flex;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 160px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    z-index: 101;

    p {
      color: #fff;
      margin-top: 20px;
      font-size: 16px;
    }

    .top-icon {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50px;
      text-align: center;
      line-height: 60px;
    }

    .icon-success {
      color: #fff;
      font-size: 41px;
      background-color: #34fa4b;
    }

    .icon-warnning {
      color: #fff;
      font-size: 44px;
      background-color: #55bbc2;
    }

    .icon-error {
      color: #fff;
      font-size: 32px;
      background-color: #e83434;
    }
  }
}
</style>

<style scoped>
@font-face {
  font-family: 'icomoon';
  src:  url('./fonts/icomoon.eot?wviqf');
  src:  url('./fonts/icomoon.eot?wviqf#iefix') format('embedded-opentype'),
    url('./fonts/icomoon.ttf?wviqf') format('truetype'),
    url('./fonts/icomoon.woff?wviqf') format('woff'),
    url('./fonts/icomoon.svg?wviqf#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-error:before {
  content: "\e90b";
  /* color: #bfbfbf; */
}
.icon-success:before {
  content: "\e90c";
  /* color: #bfbfbf; */
}
.icon-warnning:before {
  content: "\e90d";
  /* color: #bfbfbf; */
}
</style>
