Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (v, o) {
        this.data.dataList.forEach(item => {
          item.hidden = false
        })

        this.setData({
          scrollTop: 0
        })
      }
    },
    dataList: {
      type: Array,
      value: []
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
    searchText: '',
    scrollTop: 0
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
    },

    onChange(e) {
      this.data.dataList.forEach(item => {
        if (!e.detail || item.codeValue1.indexOf(e.detail) > -1) {
          item.hidden = false
        } else {
          item.hidden = true
        }
      })

      this.setData({
        dataList: this.data.dataList
      })

    }
  }
})