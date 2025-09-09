// components/hometitle/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: String,
    title: String

  },

  /**
   * 组件的初始数据
   */
  data: {
    toolBarHeight: 44

  },
  
  lifetimes: {
    attached: function() {
      this.setData({
        toolBarHeight: getApp().globalData.toolBarHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
