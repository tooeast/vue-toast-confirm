<template>
  <div class="vue-toast-confirm-vdialog">
    <div class="vue-toast-confirm-mask"></div>
    <div class="vue-toast-confirm-area" @click="closeDialog">
      <i class="vue-toast-confirm-top-icon" :class="getShowType">
        <svg v-if="type == 'success'" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="41" height="41">
          <path d="M977.696 64c-37.408 0-60.832 17.728-60.832 17.728s-159.2 106.88-304.832 248.256c0 0-93.12 82.112-280.576 320.064l-257.6-194.496c0 0-38.944-21.92-64.384 16.64-21.312 32.32 0 64.224 0 64.224l262.176 370.208c0 0 37.376 53.408 59.136 53.408 27.136 0 38.912-25.76 77.248-88 54.944-89.184 130.688-214.24 216.128-335.616 120.352-170.976 216.384-270.08 293.728-348.256 35.648-36.032 88.832-79.072 104.544-96.224C1030.112 83.552 1008.864 64 977.696 64z" fill="#fff">
          </path>
        </svg>
        <svg v-if="type == 'warnning'" t="1538106163392" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44" height="44">
          <path d="M511 1024c-57.3 0-103.5-48.2-103.5-106.5 0-59.3 46.2-106.5 103.5-106.5 57.3 0 103.5 48.2 103.5 106.5S568.3 1024 511 1024z" p-id="5398" fill="#fff">
          </path>
          <path d="M507.8 744.1 507.8 744.1c-26.4 0-79-54.6-79-109l-60-496.1c0-54.5 35.3-139 139-139l0 0c107.2 0 139 84.6 139 139l-60 506.1C586.8 699.5 536 744.1 507.8 744.1z" fill="#fff">
          </path>
        </svg>
        <svg v-if="type == 'error'" t="1538106181186" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
          <path d="M910.848 357.888l-190.668 167.526 255.692 291.124c44.236 50.278 50.074 115.814 16.178 149.812l-25.6 25.702c-33.894 33.894-99.43 28.058-149.812-16.178l-304.64-267.572L207.46 975.77c-50.278 44.134-115.814 50.074-149.812 16.178l-25.6-25.702c-33.894-33.894-28.058-99.43 16.078-149.708L303.82 525.414l-190.67-167.526c-131.584-115.61-120.626-192-57.652-254.976l47.514-47.514C165.988-7.578 242.378-18.536 357.988 113.05l154.01 175.514 154.112-175.412c115.61-131.686 192-120.626 254.874-57.652l47.514 47.514c62.874 62.874 73.934 139.264-57.65 254.874z" fill="#fff">
          </path>
        </svg>
      </i>
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
  data () {
    return {

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
.vue-toast-confirm-vdialog {
  .vue-toast-confirm-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100;
  }

  .vue-toast-confirm-area {
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

    .vue-toast-confirm-top-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 50px;

      svg {
        display: inline;
      }
    }

    .vue-toast-confirm-icon-success {
      background-color: #34fa4b;
    }

    .vue-toast-confirm-icon-warnning {
      background-color: #55bbc2;
    }

    .vue-toast-confirm-icon-error {
      background-color: #e83434;
    }
  }
}
</style>
