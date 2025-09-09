Component({
  properties: {
    btnText: {
      type: String,
      value: "提交"
    },
    btnBgColor: {
      type: String,
      value: "#136BFF"
    }

  },
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared', // 解除样式隔离
  },
  data: {},
  methods: {
    handleClick: function () {
      this.triggerEvent("handleClick");
    }
  }
});