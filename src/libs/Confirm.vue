<template>
  <div class="vdialog">
    <div class="mask"></div>
    <div class="area">
      <div class="title-area"><i v-if="type" class="title-icon" :class="getShowType"></i>{{ title }}</div>
      <div class="info-area">{{ content }}</div>
      <div class="btn-area">
        <button class="btn-confirm" @click="dialogConfirm">{{ confirmText }}</button>
        <button v-if="cancelText" class="btn-cancel" @click="closeDialog">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vdialog',
  props: {
    type: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    confirm: {
      type: Function
    },
    cancel: {
      type: Function
    },
    confirmText: {
      type: String
    },
    cancelText: {
      type: String
    }
  },
  computed: {
    getShowType () {
      return `icon-${this.type}`
    }
  },
  methods: {
    timeLine () {
      setTimeout(() => {
        this.closeDialog()
      }, this.getDuration)
    },
    closeDialog () {
      // this.$emit('close')
      this.cancel()
    },
    dialogConfirm () {
      this.confirm()
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
    width: 360px;
    max-width: 80%;
    min-width: 140px;
    // height: 200px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;
    z-index: 101;

    .title-area {
      height: 28px;
      padding: 15px 18px 5px;

      line-height: 28px;
      font-size: 18px;
      font-weight: 450;
      color: #171717;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .title-icon {
        display: inline-block;
        vertical-align: middle;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        margin-right: 8px;
        text-align: center;
        line-height: 23px;

        &.icon-success {
          color: #fff;
          font-size: 17px;
          background-color: #02e94b;
        }

        &.icon-warnning {
          color: #fff;
          font-size: 17px;
          background-color: #55bbc2;
        }

        &.icon-error {
          color: #fff;
          font-size: 14px;
          background-color: #f44343;
        }
      }
    }

    .info-area {
      // flex-grow: 1;
      // min-height: 40px;
      line-height: 1.5;
      padding: 10px 18px;
      font-size: 15px;
      color: #535355;
    }

    .btn-area {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding: 10px 18px 15px;

      button {
        // width: 45px;
        padding: 0 10px;
        line-height: 24px;
        height: 26px;
        border-radius: 3px;
        outline: none;
        border-width: 1px;
        border-style: solid;
        font-size: 12px;
        font-weight: 430;
        cursor: pointer;
        transition: .2s;
      }

      .btn-cancel {
        margin-left: 10px;
        border-color: #a2a2a2;

        &:hover {
          background-color: #a2a2a2;
          color: #fff;
        }
      }

      .btn-confirm {
        border-color: #00bbff;
        background-color: #00bbff;
        color: #fff;

        &:hover {
          border-color: #00d9ff;
          background-color: #00d9ff;
        }
      }
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
