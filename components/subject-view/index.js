// components/subject-view/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subjectCodeInfo: {
      type: Array,
      value: []
    },
    subjectFieldList: {
      type: Array,
      value: []
    },
    codegroup: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {
        console.log(newVal, oldVal, 'newVal, oldVal')
      }
    },
    isEdit: {
      type: Boolean,
      value: null,
      observer: function (newVal, oldVal) {
        this.setData({
          // 这里能用到下面data的值
        });
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    fieldChangeListener({ detail }) {
      let field = detail.field;
      let index = detail.index;
      this.data.subjectFieldList.splice(index, 1, field);
      if (field.fieldCode === 'siteId') {
        this.data.subjectFieldList.forEach((item, index) => {
          if (item.fieldCode === 'subjectCode') {
            this.data.subjectCodeInfo.forEach((subJ, i) => {
              if (subJ.codeId === field.value) {
                item.value = subJ.codeValue1
              }
            })
          }
        })
        this.setData({
          subjectFieldList: this.data.subjectFieldList
        })
      }

      this.triggerEvent('onSubjectFieldListChange', this.data.subjectFieldList);
    }
  }
})