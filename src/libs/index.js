import Vue from 'vue'
import Toast from './Toast.vue'
import Confirm from './Confirm.vue'

const vdialog = {
  vm: null,
  create (VueOpt, defaultOpt, opt) {
    opt = {
      ...defaultOpt,
      ...opt
    }
    let Dialogs = Vue.extend(VueOpt, opt)
    this.vm = new Dialogs({el: document.createElement('div')})

    Object.assign(this.vm, opt)

    document.body.appendChild(this.vm.$el)

    this.vm.$on('close', () => {
      this.close()
    })
  },
  close () {
    document.body.removeChild(this.vm.$el)
    this.vm.$destroy()
    this.vm = null
  },
  install () {
    Vue.prototype.$toast = (opt = {}) => {
      let defaultOpt = {
        msg: '提示',
        type: 'warnning',
        duration: 800
      }

      this.create(Toast, defaultOpt, opt)
    }
    Vue.prototype.$confirm = (opt = {}) => {
      let defaultOpt = {
        type: '',
        title: '标题',
        content: '内容...',
        confirmText: '确定',
        cancelText: '',
        confirm: () => {
          this.close()
        },
        cancel: () => {
          this.close()
        }
      }

      this.create(Confirm, defaultOpt, opt)
    }
    Vue.prototype.$close = () => {
      this.close()
    }
  }
}

export default vdialog
