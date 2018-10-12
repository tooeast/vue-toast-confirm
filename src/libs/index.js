import Vue from 'vue'
import Toast from './Toast.vue'
import Confirm from './Confirm.vue'
import Side from './Side.vue'
import sideContainer from './sideContainer.vue'

const vdialog = {
  vm: null,
  sideVm: null,
  sideQueue: [],
  sideNum: 56,
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
    Vue.prototype.$side = (opt = {}) => {
      this.initSideVm(Side, opt)

      this.initSideAndQueue(sideContainer)  

      this.pushItemToQueue()
  
      this.vm.$on('sideClose', (dataNum) => {
        this.sideQueue.forEach((ele, index) => {
          if(ele.dataId == dataNum) {
            this.removeItemFromQueue(ele, index)
          }
        })
      })
    }
    Vue.prototype.$close = () => {
      this.close()
    }
  },
  initSideAndQueue (obj) {
    if(!this.sideVm) {
      let sideCC = Vue.extend(obj)
      this.sideVm = new sideCC({el: document.createElement('div')})
      document.body.appendChild(this.sideVm.$el)
      this.sideQueue = []
    }
  },
  initSideVm (obj, opt) {
    let defaultOpt = {
      msg: '提示',
      type: 'warnning',
      duration: 2000
    }

    opt = {
      ...defaultOpt,
      ...opt,
      dataId: this.sideNum
    }

    this.sideNum++

    let Dialogs = Vue.extend(obj, opt)
    this.vm = new Dialogs({el: document.createElement('div')})

    Object.assign(this.vm, opt)
  },
  pushItemToQueue () {
    this.sideVm.$el.appendChild(this.vm.$el);
      
    this.sideQueue.push(this.vm);
  },
  removeItemFromQueue (obj, index) {
    this.sideVm.$el.removeChild(obj.$el);
            
    this.sideQueue.splice(index, 1)

    if(this.sideQueue.length <= 0) {
      document.body.removeChild(this.sideVm.$el);
      this.sideVm = null;
    }
  }
}

export default vdialog
