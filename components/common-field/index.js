Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    codegroup: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {

      }
    },
    field: Object,
    isEdit: {
      type: Boolean,
      value: null,
      observer: function (newVal, oldVal) {

        this.setData({
          disabled: !newVal
        });
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    disabled: false,
    number: null,
    showSheet: false,
    dropValue: '',
    showDatePop: false,
    showTimePop: false,
    dateStr: '',
    timeStr: '',
    dateTip: ''

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangeNumber({
      detail
    }) {
      this.data.field.value = detail
      this.setData({
        field: this.data.field
      })
      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });
    },
    handleChangeText({
      detail
    }) {
      console.log(detail)
      this.data.field.value = detail;
      this.setData({
        field: this.data.field
      })
      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });
    },
    handleRadioChange({
      detail = {}
    }) {
      if (this.data.field.value === detail) {
        this.data.field.value = null
      } else {
        this.data.field.value = detail
      }

      this.setData({
        field: this.data.field
      });
      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });
    },
    dropChoose(detail) {
      if (this.data.disabled) {
        return;
      }
      this.setData({
        showSheet: true
      });
      let arr = [];
      for (var i = 0; i < this.data.codegroup.length; ++i) {
        this.data.codegroup[i].name = this.data.codegroup[i].codeValue1;
      }
      this.setData({
        codegroup: this.data.codegroup
      });
    },
    onSheetSelect({ detail } = {}) {
      this.data.field.value = detail.codeId
      this.setData({
        showSheet: false,
        field: this.data.field,
        dropValue: detail.codeValue1
      });
      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });
    },
    onSheetClose({ detail } = {}) {
      this.setData({
        showSheet: false
      });
    },
    handleCheckboxChange({
      detail
    }) {
      if (this.data.field.value === detail) {
        this.data.field.value = null
      } else {
        this.data.field.value = detail
      }
      this.setData({
        field: this.data.field
      });
      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });
    },
    clickOverlay() {
      this.setData({
        showDatePop: false,
        showTimePop: false
      })
    },
    handleDate() {
      if (this.data.disabled) {
        return;
      }
      this.setData({
        showDatePop: true
      })
    },
    handleTime() {
      if (this.data.disabled) {
        return;
      }
      this.setData({
        showTimePop: true
      })
    },
    handleChangeDate({detail}) {

      this.setData({
        dateStr: detail
      })
    },
    handleChangeTime({detail}) {

      this.setData({
        timeStr: detail
      })
    },
    handleDatePosition() {
      let dateType = 'date'
      if (this.data.field.format.indexOf('HH') > -1) {
        dateType = 'datetime'
        if (this.data.field.format.indexOf('ss') > -1) {
          dateType = 'datetime2'
        }
      }
      if (dateType == 'date') {
        if (this.data.dateStr.length !== 8) {
          wx.showToast({
            title: '日期的长度必须是八位',
            icon: 'none'
          })
          return;
        }

      } else if (dateType == 'datetime') {
        if (this.data.dateStr.length !== 12) {
          wx.showToast({
            title: '日期时间的长度必须是12位',
            icon: 'none'
          })
          return;
        }
      } else if (dateType == 'datetime2') {
        if (this.data.dateStr.length !== 14) {
          wx.showToast({
            title: '日期时间的长度必须是14位',
            icon: 'none'
          })
          return;
        }
      }
      let year = this.data.dateStr.substring(0, 4);
      let month = this.data.dateStr.substring(4, 6)
      let day = this.data.dateStr.substring(6, 8)

      let hh = "";
      let mm = "";
      let ss = "";
      if (dateType != 'date') {
        hh = this.data.dateStr.substring(8, 10)
        mm = this.data.dateStr.substring(10, 12)

        if (dateType == 'datetime2') {
          ss = this.data.dateStr.substring(12, 14)
        }
      }

      let dateResult = "";
      // 兼容ios，ios不能使用yyyy-MM-dd,只能使用yyyy/MM/dd
      let hasHor = false
      if (this.data.field.format.indexOf('-') > -1) {
        hasHor = true
      }
      if (dateType == "date") {
        dateResult = new Date(year + '/' + month + '/' + day).Format(this.data.field.format.replace(/-/g, '/'));
      } else if (dateType == "datetime") {
        dateResult = new Date(year + '/' + month + '/' + day + ' ' + hh + ':' + mm).Format(this.data.field.format.replace(/-/g, '/'));
      } else if (dateType == "datetime2") {
        dateResult = new Date(year + '/' + month + '/' + day + ' ' + hh + ':' + mm + ':' + ss).Format(this.data.field.format.replace(/-/g, '/'));
      }
      if (hasHor) {
        dateResult = dateResult.replace(/\//g, '-')
      }
      this.data.field.value = dateResult;
      this.setData({
        field: this.data.field,
        showDatePop: false
      });

      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });

    },
    handleDateCancel() {
      this.setData({
        showDatePop: false
      })
    },
    handleTimePosition() {
      if (this.data.timeStr.length !== 4) {
        wx.showToast({
          title: '时间的长度必须是四位',
          icon: 'none'
        })
        return;
      }

      let hour = this.data.timeStr.substring(0, 2);
      let munite = this.data.timeStr.substring(2, 4);
      let format = this.data.field.format;
      let middle = ":";
      if (format && format.length == 5) {
        middle = format.substring(2, 3);
      }
      let timeResult = hour + middle + munite;
      this.data.field.value = timeResult;
      this.setData({
        field: this.data.field,
        showTimePop: false
      });

      let field = this.data.field;
      let index = this.data.index;
      this.triggerEvent('onFieldChangeListener', {
        field,
        index
      });

    },
    handleTimeCancel() {
      this.setData({
        showTimePop: false
      })
    }
  },
  lifetimes: {
    ready() {
      if (this.data.field.value === null) {
        this.data.field.value = '';
        this.setData({
          field: this.data.field
        })
      }
      // date
      if (this.data.field.fieldTypeId === 4) {
        let format = "yyyyMMdd"
        let tip = '提示：日期格式为八位，例如2020-01-01，输入20200101'
        if (this.data.field.format.indexOf('HH') > -1) {
          format = "yyyyMMddHHmm"
          tip = '提示：日期时间格式为12位，例如2020-01-01 12:12，输入202001011212'
          if (this.data.field.format.indexOf('ss') > -1) {
            format = "yyyyMMddHHmmss"
            tip = '提示：日期时间格式为14位，例如2020-01-01 12:12:12，输入20200101121212'
          }
        }
        this.setData({
          dateTip: tip
        })
        if (this.data.field.value) {
          let dateResult = new Date(this.data.field.value.replace(/-/g, '/')).Format(format);
          this.setData({
            dateStr: dateResult
          })
        }
      }

      // time
      if (this.data.field.fieldTypeId === 5) {
        let middle = ":";
        let format = this.data.field.format
        if (format && format.length == 5) {
          middle = format.substring(2, 3);
        }

        if (this.data.field.value) {
          let timeResult = this.data.field.value.replace(middle, "");
          this.setData({
            timeStr: timeResult
          })
        }
      }

      // dropValue
      if (this.data.field.value && this.data.field.fieldTypeId === 7) {
        for (var i = 0; i < this.data.codegroup.length; i++) {
          if (this.data.field.value + '' === this.data.codegroup[i].codeId + '') {
            this.setData({
              dropValue: this.data.codegroup[i].codeValue1
            })
          }
        }
      }
    }
  }
})