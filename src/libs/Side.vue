<template>
  <div class="vue-toast-confirm-vdialog" :data-id="dataId" :class="[isAnimation ? 'vue-toast-confirm-animationOut' : 'vue-toast-confirm-animationIn']">
    <div class="vue-toast-confirm-area" :class="getShowType" v-on:mouseenter="dialogMouseEnter" v-on:mouseleave="dialogMouseLeave">
      <div class="vue-toast-confirm-info-area">
        <p>{{ msg }}</p>
      </div>
      <div class="vue-toast-confirm-right-close" @click="closeDialog(dataId)"></div>
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
    dataId: {
      type: String
    }
  },
  data () {
    return {
      isAnimation: false,
      timer: null
    }
  },
  computed: {
    getShowType () {
      return `vue-toast-confirm-icon-${this.type}`
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
      this.timer = setTimeout(() => {
        this.closeDialog(this.dataId)
      }, this.getDuration)
    },
    closeDialog (id) {
      this.isAnimation = true;
      setTimeout(() => {
        this.$emit('sideClose', id)
      }, 800);
    },
    dialogMouseEnter () {
      // this.timer = setTimeout(() => {
      //   this.closeDialog(this.dataId)
      // }, this.getDuration)

      clearTimeout(this.timer)
      this.timer = null
    },
    dialogMouseLeave () {
      this.timer = setTimeout(() => {
        this.closeDialog(this.dataId)
      }, this.getDuration)
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-toast-confirm-vdialog {
  .vue-toast-confirm-area {
    display: flex;
    position: relative;
    width: 200px;
    height: 70px;
    margin-top: 20px;
    margin-right: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 6px 1px #b8b8b8;
    border-radius: 4px;

    .vue-toast-confirm-info-area {
      position: relative;
      flex-grow: 1;
      padding-left: 15px;
      max-width: 180px;
      overflow: hidden;
      
      p {
        color: #fff;
        font-size: 14px;
        line-height: 1.5;
      }
    }

    .vue-toast-confirm-right-close {
      position: relative;
      width: 30px;
      height: 100%;
      border-left: 1px solid transparent;
      cursor: pointer;
      transition: .4s;

      &:before, &:after {
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 18px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.557);
        transition: .4s;
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    &:hover {
      .vue-toast-confirm-right-close {
        border-left-color: rgba(255, 255, 255, 0.557);

        &:before, &:after {
          background-color: #fff;
        }
      }
    }
  }
}
.vue-toast-confirm-icon-success {
  background-color: #1eba30;
}

.vue-toast-confirm-icon-warnning {
  background-color: #55bbc2;
}

.vue-toast-confirm-icon-error {
  background-color: #ff2d2d;
}

.vue-toast-confirm-animationOut {
  animation: moveOut 1.4s forwards;
}
@keyframes moveOut {
  5% {
    transform: translateX(-14px);
  }
  80% {
    transform: translateX(700px);
    height: 0;
  }
  100% {
    transform: translateX(1000px);
    height: 0;
  }
}
.vue-toast-confirm-animationIn {
  animation: moveIn .4s forwards;
}
@keyframes moveIn {
  0% {
    transform: translateX(500px);
  }
  90% {
    transform: translateX(-14px);
  }
  100% {}
}
</style>
