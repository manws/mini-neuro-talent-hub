Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    permission: {
      type: Object,
      value: {}
    }
  },
  show: {
    'show': function (show) {
      console.log('op-menu-popup', show);
    }
  },

  lifetimes: {
    attached: function () {

    }
  },

  pageLifetimes: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0,
    menu_edit: '../../assets/menu_edit.svg',
    menu_random: '../../assets/menu_random.svg',
    menu_abort: '../../assets/menu_abort.svg',
    menu_failure: '../../assets/menu_failure.svg',
    menu_over: '../../assets/menu_over.svg',
    menu_doblind: '../../assets/menu_doblind.svg',
    menu_invalid: '../../assets/menu_invalid.svg',
    menu_delete: '../../assets/menu_delete.svg',
    existPermission: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        show: false
      })
    },

    handleClick(e) {
      this.onClose()
      this.triggerEvent("change", e.currentTarget.dataset.item)
    }
  }
})