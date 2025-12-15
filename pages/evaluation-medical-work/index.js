// pages/evaluation-medical-work/index.js
import medicalWorkData from './medical_work.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    position: 0,
    fieldLength: 0,
    scoreResult: "",
    scoreList: [],
    id: "",
    scoreTypeId: "",
    param: {},
    fileList: [],
    formData: {}, // 存储表单数据
    isCurrentPageComplete: false, // 当前页面数据是否完整
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { id, scoreTypeId } = options;
    console.log("接收到的参数:", { id, scoreTypeId });

    // 保存页面参数到data中
    this.setData({
      id,
      scoreTypeId,
    });

    // 使用medical_work数据而不是调用接口
    this.loadMedicalWorkData();
    
    // 加载本地存储的数据
    // this.loadLocalStorageData();
    const { contentResult } = await wx.API.contentResult(scoreTypeId, id)
    this.loadFormData(contentResult);
  },

  /**
   * 加载medical_work数据
   */
  loadMedicalWorkData() {
    // 将嵌套的数据结构扁平化为scoreList格式
    const scoreList = this.flattenMedicalWorkData(medicalWorkData);
    
    this.setData({
      scoreList,
      fieldLength: scoreList.length,
    });
    
    // 初始检查第一页的完整性状态
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 将medical_work数据扁平化
   */
  flattenMedicalWorkData(data) {
    const result = [];
    
    data.forEach(item => {
      if (item.type === 'group' && item.children) {
        // 如果是分组，将整个分组作为一个item
        result.push({
          ...item,
          level2Code: item.fieldCode,
          level2Name: item.title,
          level2Content: '',
          value: '',
          isGroup: true,
          groupChildren: item.children.map((child, childIndex) => {
            const baseKey = `${item.fieldCode}_${childIndex + 1}`;
            
            // 根据类型生成不同的dataKey
            let dataKeys = {};
            
            if (child.type === 'text_with_radio') {
              // 文本+单选：Q4_1_1, Q4_1_2
              dataKeys = {
                textDataKey: `${baseKey}_1`,
                radioDataKey: `${baseKey}_2`
              };
            } else if (child.type === 'single_choice_with_text') {
              // 单选+描述：Q7_1_1, Q7_1_2
              dataKeys = {
                mainDataKey: `${baseKey}_1`,
                descDataKey: `${baseKey}_2`
              };
            } else {
              // 其他类型：Q2_1, Q3_1等
              dataKeys = {
                dataKey: baseKey
              };
            }
            
            return {
              ...child,
              level2Code: child.fieldCode,
              level2Name: child.title,
              value: child.defaultValue || '',
              isVisible: child.dependsOn ? false : true, // 有依赖关系的默认隐藏
              ...dataKeys
            };
          })
        });
      } else {
        // 直接添加到结果中
        let dataKeys = {};
        
        if (item.type === 'single_choice_with_text') {
          // 单个项目的单选+描述：Q8_1, Q8_2
          dataKeys = {
            mainDataKey: `${item.fieldCode}_1`,
            descDataKey: `${item.fieldCode}_2`
          };
        } else {
          // 其他单个项目：Q1, Q9等
          dataKeys = {
            dataKey: item.fieldCode
          };
        }
        
        result.push({
          ...item,
          level2Code: item.fieldCode,
          level2Name: item.title,
          level2Content: '',
          value: item.defaultValue || '',
          isGroup: false,
          ...dataKeys
        });
      }
    });
    
    return result;
  },
  swipterChange(e) {
    const {
      detail: { current },
    } = e;
    this.setData({
      position: current,
    });
    const imgList = this.data.scoreList[current].imgList || []
    const fileList = []
    console.log('WS_LOG,imgList', JSON.stringify(imgList))
    imgList.forEach(item => {
      fileList.push({
        url: item
      })
    })
    this.setData({
      fileList: fileList
    })
    
    // 检查新页面的完整性状态
    this.checkAndUpdatePageCompleteness();
  },
  back() {
    wx.navigateBack();
  },
  previous() {
    this.setData({
      position: this.data.position - 1,
    });
    
    // 检查新页面的完整性状态
    this.checkAndUpdatePageCompleteness();
  },
  next() {
    // 验证当前页面数据完整性
    if (!this.validateCurrentPageData()) {
      return; // 如果验证失败，不允许进入下一页
    }
    
    if (this.data.position < this.data.scoreList.length) {
      this.setData({
        position: this.data.position + 1,
      });
    }
  },

  /**
   * 验证当前页面数据完整性
   */
  validateCurrentPageData() {
    const currentItem = this.data.scoreList[this.data.position];
    const missingFields = [];
    
    if (currentItem.isGroup) {
      // 分组项目验证
      currentItem.groupChildren.forEach((subItem, index) => {
        // 跳过不可见的项目
        if (subItem.isVisible === false) {
          return;
        }
        
        const fieldCode = subItem.level2Code;
        const fieldData = this.data.formData[fieldCode];
        
        if (!this.isFieldDataComplete(subItem, fieldData)) {
          missingFields.push(`${currentItem.fieldCode}.${index + 1} ${subItem.title}`);
        }
      });
    } else {
      // 单个项目验证
      const fieldCode = currentItem.fieldCode;
      const fieldData = this.data.formData[fieldCode];
      
      if (!this.isFieldDataComplete(currentItem, fieldData)) {
        missingFields.push(currentItem.title);
      }
    }
    
    if (missingFields.length > 0) {
      wx.showToast({
        title: `请完成以下必填项：\n${missingFields.join('\n')}`,
        icon: 'none',
        duration: 3000
      });
      return false;
    }
    
    return true;
  },

  /**
   * 检查并更新当前页面完整性状态
   */
  checkAndUpdatePageCompleteness() {
    const isComplete = this.checkCurrentPageDataSilently();
    this.setData({
      isCurrentPageComplete: isComplete
    });
  },

  /**
   * 静默检查当前页面数据完整性（不显示提示）
   */
  checkCurrentPageDataSilently() {
    const currentItem = this.data.scoreList[this.data.position];
    console.log('检查页面完整性 - 当前项目:', currentItem);
    console.log('检查页面完整性 - 表单数据:', this.data.formData);
    
    if (currentItem.isGroup) {
      // 分组项目验证
      for (let subItem of currentItem.groupChildren) {
        // 跳过不可见的项目
        if (subItem.isVisible === false) {
          console.log('跳过不可见项目:', subItem.fieldCode);
          continue;
        }
        
        const fieldCode = subItem.level2Code;
        const fieldData = this.data.formData[fieldCode];
        console.log(`检查子项目 ${fieldCode}:`, fieldData);
        
        if (!this.isFieldDataComplete(subItem, fieldData)) {
          console.log(`子项目 ${fieldCode} 数据不完整`);
          return false;
        }
      }
    } else {
      // 单个项目验证
      const fieldCode = currentItem.fieldCode;
      const fieldData = this.data.formData[fieldCode];
      console.log(`检查单个项目 ${fieldCode}:`, fieldData);
      
      if (!this.isFieldDataComplete(currentItem, fieldData)) {
        console.log(`单个项目 ${fieldCode} 数据不完整`);
        return false;
      }
    }
    
    console.log('页面数据完整性检查通过');
    return true;
  },
  isFieldDataComplete(item, fieldData) {
    console.log(`检查字段完整性 - 字段类型: ${item.type}, 字段代码: ${item.fieldCode}`, fieldData);
    
    if (!fieldData) {
      console.log('字段数据为空');
      return false;
    }
    
    switch (item.type) {
      case 'single_choice':
        const singleChoiceComplete = fieldData.selectedValue !== undefined && fieldData.selectedValue !== '';
        console.log(`单选题完整性: ${singleChoiceComplete}, selectedValue: ${fieldData.selectedValue}`);
        return singleChoiceComplete;
        
      case 'multiple_choice':
        const multipleChoiceComplete = fieldData.selectedValues && fieldData.selectedValues.length > 0;
        console.log(`多选题完整性: ${multipleChoiceComplete}, selectedValues:`, fieldData.selectedValues);
        return multipleChoiceComplete;
        
      case 'text':
      case 'number':
        const textComplete = fieldData.value !== undefined && fieldData.value !== '';
        console.log(`文本/数字完整性: ${textComplete}, value: ${fieldData.value}`);
        return textComplete;
        
      case 'text_with_radio':
        // 文本+单选：两个都需要填写
        const textWithRadioComplete = (fieldData.value !== undefined && fieldData.value !== '') &&
               (fieldData.subSelectedValue !== undefined && fieldData.subSelectedValue !== '');
        console.log(`文本+单选完整性: ${textWithRadioComplete}, value: ${fieldData.value}, subSelectedValue: ${fieldData.subSelectedValue}`);
        return textWithRadioComplete;
        
      case 'single_choice_with_text':
        // 单选+描述：单选必填，描述根据是否显示来判断
        const hasMainSelection = fieldData.selectedValue !== undefined && fieldData.selectedValue !== '';
        console.log(`单选+描述 - 主选择: ${hasMainSelection}, selectedValue: ${fieldData.selectedValue}`);
        if (!hasMainSelection) {
          return false;
        }
        
        // 如果显示描述框，则描述也必填
        if (item.showDescription) {
          const descComplete = fieldData.description !== undefined && fieldData.description !== '';
          console.log(`描述框完整性: ${descComplete}, description: ${fieldData.description}`);
          return descComplete;
        }
        
        return true;
        
      default:
        console.log('未知字段类型，默认返回true');
        return true;
    }
  },

  /**
   * 处理输入框输入事件
   */
  handleInput(e) {
    const { value } = e.detail;
    const { fieldcode, inputtype, datakey } = e.currentTarget.dataset;
    
    // 使用datakey作为最终数据的key
    const finalKey = datakey || fieldcode;
    
    if (!this.data.formData[fieldcode]) {
      this.data.formData[fieldcode] = {};
    }
    
    if (inputtype === 'description') {
      this.data.formData[fieldcode].description = value;
      // 描述输入使用专门的descDataKey
      this.data.param[finalKey] = value;
    } else {
      this.data.formData[fieldcode].value = value;
      this.data.param[finalKey] = value || "0";
    }
    
    // 检查并更新页面完整性状态
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 处理单选框选择事件
   */
  handleRadioChange(e) {
    const { value } = e.detail;
    const { fieldcode, radiotype, datakey } = e.currentTarget.dataset;
    
    // 使用datakey作为最终数据的key
    const finalKey = datakey || fieldcode;
    
    if (!this.data.formData[fieldcode]) {
      this.data.formData[fieldcode] = {};
    }
    
    if (radiotype === 'main') {
      this.data.formData[fieldcode].selectedValue = value;
      this.data.param[finalKey] = value;
      
      // 如果是带描述的单选，需要更新显示状态并清空描述内容
      this.updateDescriptionVisibility(fieldcode, value);
      
      // 检查是否需要更新依赖项的显示状态
      this.updateDependentItemsVisibility(fieldcode, value);
    } else if (radiotype === 'sub') {
      this.data.formData[fieldcode].subSelectedValue = value;
      this.data.param[finalKey] = value;
    }
    
    // 检查并更新页面完整性状态
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 更新依赖项的显示状态
   */
  updateDependentItemsVisibility(fieldcode, selectedValue) {
    const currentItem = this.data.scoreList[this.data.position];
    
    // 如果是分组，检查子项的依赖关系
    if (currentItem.isGroup && currentItem.groupChildren) {
      currentItem.groupChildren.forEach((subItem, subIndex) => {
        if (subItem.dependsOn === fieldcode) {
          const shouldShow = selectedValue === subItem.showWhenValue;
          this.setData({
            [`scoreList[${this.data.position}].groupChildren[${subIndex}].isVisible`]: shouldShow
          });
          
          // 如果隐藏了依赖项，清空其数据
          if (!shouldShow) {
            this.clearDependentItemData(subItem);
          }
        }
      });
    }
    
    // 依赖项显示状态改变后，重新检查页面完整性
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 清空依赖项的数据
   */
  clearDependentItemData(item) {
    const fieldcode = item.fieldCode;
    
    // 清空formData
    if (this.data.formData[fieldcode]) {
      delete this.data.formData[fieldcode];
    }
    
    // 清空param中的数据
    if (item.dataKey && this.data.param[item.dataKey]) {
      delete this.data.param[item.dataKey];
    }
    
    // 同步更新页面数据
    this.setData({
      [`formData.${fieldcode}`]: null
    });
  },

  /**
   * 更新描述输入框的显示状态
   */
  updateDescriptionVisibility(fieldcode, selectedValue) {
    const currentItem = this.data.scoreList[this.data.position];
    
    // 检查当前项是否有描述功能
    if (currentItem.hasDescription && currentItem.descriptionTriggerCode === selectedValue) {
      this.setData({
        [`scoreList[${this.data.position}].showDescription`]: true
      });
    } else if (currentItem.hasDescription) {
      this.setData({
        [`scoreList[${this.data.position}].showDescription`]: false
      });
      // 清空描述内容
      this.clearDescriptionData(currentItem, fieldcode);
    }
    
    // 如果是分组，检查子项
    if (currentItem.isGroup && currentItem.groupChildren) {
      currentItem.groupChildren.forEach((subItem, subIndex) => {
        if (subItem.fieldCode === fieldcode && subItem.hasDescription) {
          const showDescription = selectedValue === subItem.descriptionTriggerCode;
          this.setData({
            [`scoreList[${this.data.position}].groupChildren[${subIndex}].showDescription`]: showDescription
          });
          
          // 如果隐藏描述框，清空描述内容
          if (!showDescription) {
            this.clearDescriptionData(subItem, fieldcode);
          }
        }
      });
    }
  },

  /**
   * 清空描述相关数据
   */
  clearDescriptionData(item, fieldcode) {
    // 清空formData中的描述
    if (this.data.formData[fieldcode]) {
      this.data.formData[fieldcode].description = '';
      // 同步更新页面数据
      this.setData({
        [`formData.${fieldcode}.description`]: ''
      });
    }
    
    // 清空param中的描述数据
    const descKey = item.descDataKey;
    if (descKey && this.data.param[descKey]) {
      delete this.data.param[descKey];
    }
  },

  /**
   * 处理多选框选择事件
   */
  /**
   * 处理多选框选择事件
   */
  handleCheckboxChange(e) {
    const { value } = e.detail;
    const { fieldcode, datakey } = e.currentTarget.dataset;
    
    // 使用datakey作为最终数据的key
    const finalKey = datakey || fieldcode;
    
    if (!this.data.formData[fieldcode]) {
      this.data.formData[fieldcode] = {};
    }
    
    this.data.formData[fieldcode].selectedValues = value;
    this.data.param[finalKey] = value.join(',');
    
    // 检查并更新页面完整性状态
    this.checkAndUpdatePageCompleteness();
  },
  debugCurrentPage() {
    const currentItem = this.data.scoreList[this.data.position];
    const isComplete = this.checkCurrentPageDataSilently();
    
    console.log('=== 调试信息 ===');
    console.log('当前位置:', this.data.position);
    console.log('当前项目:', currentItem);
    console.log('表单数据:', this.data.formData);
    console.log('参数数据:', this.data.param);
    console.log('页面完整性:', isComplete);
    console.log('按钮状态:', this.data.isCurrentPageComplete);
    
    wx.showModal({
      title: '调试信息',
      content: `页面完整性: ${isComplete}\n按钮状态: ${this.data.isCurrentPageComplete}\n详细信息请查看控制台`,
      showCancel: false
    });
  },

  /**
   * 提交表单数据
   */
  async submit() {
    // 验证当前页面数据完整性
    if (!this.validateCurrentPageData()) {
      return; // 如果验证失败，不允许提交
    }
    
    // 获取最终的JSON数据
    const finalData = this.getFinalJsonData();
    console.log("最终提交的数据:", JSON.stringify(finalData, null, 2));
    
    // 保存数据到本地存储
    // this.saveToLocalStorage(finalData);
    
    // 这里可以调用API提交数据
    const { scoreTypeId, id } = this.data;
    await this.saveContent(scoreTypeId, id, finalData)
    // await this.callUserScoreUpdate(scoreTypeId, id);
  },

  async saveContent(scoreTypeId, levelId, param) {
    const { scoreResult } = await wx.API.SaveContent(scoreTypeId, levelId, param)
    console.log('saveContent', JSON.stringify(scoreResult))
    wx.redirectTo({
      url: "/pages/evaluation-result/index?scoreResult=" + scoreResult,
    });
  },

  /**
   * 保存数据到本地存储
   */
  saveToLocalStorage(data) {
    try {
      const { id, scoreTypeId } = this.data;
      const storageKey = `medical_work_data_${scoreTypeId}_${id}`;
      
      const storageData = {
        formData: data,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      wx.setStorageSync(storageKey, storageData);
      console.log('数据已保存到本地存储:', storageKey, storageData);
      
      wx.showToast({
        title: '数据已保存',
        icon: 'success',
        duration: 1500
      });
    } catch (error) {
      console.error('保存到本地存储失败:', error);
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      });
    }
  },

  /**
   * 从本地存储加载数据
   */
  loadLocalStorageData() {
    try {
      const { id, scoreTypeId } = this.data;
      const storageKey = `medical_work_data_${scoreTypeId}_${id}`;
      
      const storageData = wx.getStorageSync(storageKey);
      
      if (storageData && storageData.formData) {
        console.log('从本地存储加载数据:', storageData);
        
        // 直接加载数据，不显示确认对话框
        this.loadFormData(storageData.formData);
      } else {
        console.log('本地存储中没有找到数据');
      }
    } catch (error) {
      console.error('从本地存储加载数据失败:', error);
    }
  },

  /**
   * 格式化时间戳为可读格式
   */
  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  /**
   * 清除本地存储数据
   */
  clearLocalStorage() {
    try {
      const { id, scoreTypeId } = this.data;
      const storageKey = `medical_work_data_${scoreTypeId}_${id}`;
      
      wx.removeStorageSync(storageKey);
      console.log('本地存储数据已清除:', storageKey);
      
      wx.showToast({
        title: '本地数据已清除',
        icon: 'success'
      });
    } catch (error) {
      console.error('清除本地存储失败:', error);
      wx.showToast({
        title: '清除失败',
        icon: 'error'
      });
    }
  },

  /**
   * 获取最终的JSON数据格式
   */
  getFinalJsonData() {
    const result = {};
    
    // 遍历param中的所有数据
    Object.keys(this.data.param).forEach(key => {
      const value = this.data.param[key];
      if (value !== undefined && value !== null && value !== '') {
        result[key] = value;
      }
    });
    
    return result;
  },

  /**
   * 调用singleL0接口
   */
  async callSingleL0(scoreTypeId, levelId) {
    try {
      const res = await wx.API.userScoreSingle0(scoreTypeId, levelId, {});
      console.log("singleL0接口调用成功:", res);

      // 处理返回的数据
      if (res) {
        const { scoreResult, scoreList } = res;
        // 将数据存储到页面数据中
        this.setData({
          scoreResult,
          scoreList,
          fieldLength: scoreList.length,
        });
        const imgList = scoreList && scoreList.length >0 && scoreList[0].imgList ? scoreList[0].imgList : []
        const fileList = []
        imgList.forEach(item => {
          fileList.push({
            url: item
          })
        })
        this.setData({
          fileList: fileList
        })
      }
    } catch (err) {
      console.error("singleL0接口调用失败:", err);
      wx.showToast({
        title: "获取数据失败",
        icon: "none",
      });
    }
  },

  /**
   * 调用userScoreUpdate接口
   */
  async callUserScoreUpdate(scoreTypeId, levelId) {
    try {
      const param = {};
      this.data.scoreList.forEach((item) => {
        if (this.data.param[item.level2Code]) {
          if (
            this.data.param.hasOwnProperty(item.level2Code) &&
            this.data.param
          ) {
            param[item.level2Code] = this.data.param[item.level2Code];
          }
        } else {
          param[item.level2Code] = item.value ? item.value : "0";
        }
      });
      const { scoreResult } = await wx.API.userScoreUpdate(
        scoreTypeId,
        levelId,
        param
      );
      wx.redirectTo({
        url: "/pages/evaluation-result/index?scoreResult=" + scoreResult,
      });
    } catch (err) {
      console.error("userScoreUpdate接口调用失败:", err);
      wx.showToast({
        title: "提交失败",
        icon: "none",
      });
    }
  },
  async upload(file) {
    const item = this.data.scoreList[this.data.position];
    const scoreTypeId = item.scoreTypeId;
    const level0Id = item.level0Id;
    const level1Id = item.level1Id;
    const level2Code = item.level2Code;
    const result = await wx.API.uploadImage(
      scoreTypeId,
      level0Id,
      level1Id,
      level2Code,
      file
    );
    return result.urlPath && result.fileName ? result : null;
  },
  /**
   * 文件读取后的回调函数
   * @param {Object} e - 事件对象
   * @param {Object} e.detail.file - 读取的文件对象
   * @description
   * 1. 设置文件状态为上传中
   * 2. 调用上传方法
   * 3. 更新文件列表数据
   */
  async fileAfterRead(e) {
    // 下面的files返回的是一个file数组
    let files = e.detail.file;
    console.log("WS_LOG, fileAfterRead", JSON.stringify(files))
    let { fileList = [] } = this.data;
    const addFileList = []
    files.forEach((item) => {
      const image = {
        status: "uploading",
        message: "上传中",
        url: item.url,
        needFile: true
      }
      addFileList.push(image)
    });
    
    fileList = fileList.concat(addFileList);
    this.setData({
      fileList: fileList,
    });
    for (let i = 0; i < fileList.length; i++) {
      const item = fileList[i]
      if (item.needFile) {
        const result = await this.upload(item);
        if (result) {
          delete item.needFile
          item.url = result.urlPath
          item.status = 'done'
          this.setData({
            fileList: fileList,
          });
        } else {
          delete item.needFile
          item.status = 'failed'
          item.message = '上传失败'
          this.setData({
            fileList: fileList,
          });
        }
      }
    }
    console.log("WS_LOG, fileList", fileList);
  },

  fileDeleteImg(e) {
    console.log('fileDeleteImg', e)
    this.data.fileList.splice(e.detail.index, 1);
    const file = e.detail.file
    const url = file.url
    console.log('fileDeleteImg', file)
    if (url.indexOf("https://snscore.xhedc.com/uploadImage") == 0 
    || url.indexOf("https://sncore.xhedc.com/uploadImage") == 0) {
      const arr = url.split('/')
      const deleteFileName = arr[arr.length - 1]
      wx.API.delImage(deleteFileName)
    }
    this.setData({
      fileList: this.data.fileList,
    });
  },

  /**
   * 加载回显数据
   */
  loadFormData(flatData) {
    if (!flatData || typeof flatData !== 'object') {
      console.log('无效的数据格式');
      return;
    }
    
    console.log('开始加载回显数据:', flatData);
    
    // 转换扁平化数据为表单内部结构
    const convertedFormData = this.convertFlatDataToFormData(flatData);
    const convertedParam = { ...flatData };
    
    console.log('转换后的表单数据:', convertedFormData);
    
    // 更新数据并触发页面重新渲染
    this.setData({
      formData: convertedFormData,
      param: convertedParam
    });
    
    // 更新依赖项的显示状态
    this.updateAllDependentItemsVisibility();
    
    // 检查页面完整性
    this.checkAndUpdatePageCompleteness();
    
    console.log('数据回显完成');
  },

  /**
   * 将扁平化数据转换为表单内部数据结构
   */
  convertFlatDataToFormData(flatData) {
    const formData = {};
    
    console.log('开始转换数据，scoreList:', this.data.scoreList);
    
    // 遍历scoreList，为每个字段设置数据
    this.data.scoreList.forEach(item => {
      if (item.isGroup) {
        // 处理分组项目
        item.groupChildren.forEach(subItem => {
          const fieldCode = subItem.level2Code;
          console.log('处理分组子项:', fieldCode, subItem);
          this.setFieldDataFromFlat(formData, subItem, flatData, fieldCode);
        });
      } else {
        // 处理单个项目
        const fieldCode = item.level2Code;
        console.log('处理单个项目:', fieldCode, item);
        this.setFieldDataFromFlat(formData, item, flatData, fieldCode);
      }
    });
    
    return formData;
  },

  /**
   * 根据字段类型设置表单数据
   */
  setFieldDataFromFlat(formData, item, flatData, fieldCode) {
    if (!formData[fieldCode]) {
      formData[fieldCode] = {};
    }
    
    console.log(`设置字段数据 - 字段: ${fieldCode}, 类型: ${item.type}`);
    
    switch (item.type) {
      case 'single_choice':
        // 单选题：查找对应的dataKey
        const singleChoiceKey = item.dataKey;
        console.log(`单选题 - dataKey: ${singleChoiceKey}, 值: ${flatData[singleChoiceKey]}`);
        if (flatData[singleChoiceKey] !== undefined) {
          formData[fieldCode].selectedValue = flatData[singleChoiceKey];
        }
        break;
        
      case 'multiple_choice':
        // 多选题：将逗号分隔的字符串转为数组
        const multipleChoiceKey = item.dataKey;
        console.log(`多选题 - 字段: ${fieldCode}, dataKey: ${multipleChoiceKey}, 原始值: "${flatData[multipleChoiceKey]}", 类型: ${typeof flatData[multipleChoiceKey]}`);
        if (flatData[multipleChoiceKey] !== undefined && flatData[multipleChoiceKey] !== '') {
          const selectedArray = flatData[multipleChoiceKey].split(',');
          formData[fieldCode].selectedValues = selectedArray;
          console.log(`多选题设置成功 - formData[${fieldCode}].selectedValues =`, selectedArray);
        } else {
          console.log(`多选题数据为空或未定义`);
        }
        break;
        
      case 'text':
      case 'number':
        // 文本/数字输入
        const textKey = item.dataKey;
        console.log(`文本/数字输入 - 字段: ${fieldCode}, dataKey: ${textKey}, 原始值: ${flatData[textKey]}, 类型: ${typeof flatData[textKey]}`);
        if (flatData[textKey] !== undefined) {
          formData[fieldCode].value = String(flatData[textKey]); // 确保转为字符串
          console.log(`设置成功 - formData[${fieldCode}].value = ${formData[fieldCode].value}`);
        }
        break;
        
      case 'text_with_radio':
        // 文本+单选组合
        const textDataKey = item.textDataKey;
        const radioDataKey = item.radioDataKey;
        console.log(`文本+单选 - textKey: ${textDataKey}, radioKey: ${radioDataKey}`);
        if (flatData[textDataKey] !== undefined) {
          formData[fieldCode].value = flatData[textDataKey];
        }
        if (flatData[radioDataKey] !== undefined) {
          formData[fieldCode].subSelectedValue = flatData[radioDataKey];
        }
        break;
        
      case 'single_choice_with_text':
        // 单选+描述组合
        const mainDataKey = item.mainDataKey;
        const descDataKey = item.descDataKey;
        console.log(`单选+描述 - mainKey: ${mainDataKey}, descKey: ${descDataKey}`);
        if (flatData[mainDataKey] !== undefined) {
          formData[fieldCode].selectedValue = flatData[mainDataKey];
        }
        if (flatData[descDataKey] !== undefined) {
          formData[fieldCode].description = flatData[descDataKey];
        }
        break;
    }
  },

  /**
   * 更新所有依赖项的显示状态
   */
  updateAllDependentItemsVisibility() {
    this.data.scoreList.forEach((item, itemIndex) => {
      if (item.isGroup && item.groupChildren) {
        item.groupChildren.forEach((subItem, subIndex) => {
          if (subItem.dependsOn) {
            // 查找依赖的字段值
            const dependentFieldData = this.data.formData[subItem.dependsOn];
            if (dependentFieldData && dependentFieldData.selectedValue) {
              const shouldShow = dependentFieldData.selectedValue === subItem.showWhenValue;
              this.setData({
                [`scoreList[${itemIndex}].groupChildren[${subIndex}].isVisible`]: shouldShow
              });
            }
          }
          
          // 更新描述框显示状态
          if (subItem.hasDescription) {
            const fieldData = this.data.formData[subItem.fieldCode];
            if (fieldData && fieldData.selectedValue) {
              const shouldShowDescription = fieldData.selectedValue === subItem.descriptionTriggerCode;
              this.setData({
                [`scoreList[${itemIndex}].groupChildren[${subIndex}].showDescription`]: shouldShowDescription
              });
            }
          }
        });
      } else {
        // 处理单个项目的描述框显示状态
        if (item.hasDescription) {
          const fieldData = this.data.formData[item.fieldCode];
          if (fieldData && fieldData.selectedValue) {
            const shouldShowDescription = fieldData.selectedValue === item.descriptionTriggerCode;
            this.setData({
              [`scoreList[${itemIndex}].showDescription`]: shouldShowDescription
            });
          }
        }
      }
    });
  },
});
