// pages/evaluation-medical-work/index.js
import generatedMedicalFormData from './generated_medical_work_form.js';
import generatedTeachingFormData from './generated_teaching_form.js';
import generatedResearchFormData from './generated_research_form.js';
import generatedTalentFormData from './generated_talent_form.js';
import generatedServiceFormData from './generated_service_form.js';
import generatedMySelfFormData from './generated_my_self_form.js';



Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
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
    const { id, scoreTypeId, scoreTypeName } = options;
    console.log("接收到的参数:", { id, scoreTypeId });

    // 保存页面参数到data中
    this.setData({
      id,
      scoreTypeId,
      title: scoreTypeName
    });

    // 使用generated_form数据
    const map = {
      "1": generatedMedicalFormData,
      "2": generatedTeachingFormData,
      "3": generatedResearchFormData,
      "4": generatedTalentFormData,
      "5": generatedServiceFormData,
      "6": generatedMySelfFormData
    }
    const generatedFormData = map[id]

    this.loadGeneratedFormData(generatedFormData);
    
    const { contentResult } = await wx.API.contentResult(scoreTypeId, id)
    this.loadFormData(contentResult);
  },

  /**
   * 加载generated_form数据
   */
  loadGeneratedFormData(generatedFormData) {
    // 转换新格式数据为UI组件可用的scoreList格式
    const scoreList = this.transformGeneratedFormData(generatedFormData);
    
    this.setData({
      scoreList,
      fieldLength: scoreList.length,
    });
    
    console.log('转换后的scoreList:', scoreList);

    // 初始检查第一页的完整性状态
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 转换generated_form数据为UI组件格式
   */
  transformGeneratedFormData(formData) {
    const result = [];
    
    formData.forEach((item) => {
      if (item.type === 'group' && item.children) {
        // 处理分组类型
        result.push(this.createGroupItem(item));
      } else {
        // 处理单个字段类型
        result.push(this.createSingleItem(item));
      }
    });
    
    return result;
  },

  /**
   * 创建分组项目
   */
  createGroupItem(groupItem) {
    return {
      ...groupItem,
      level2Code: groupItem.fieldCode,
      level2Name: groupItem.title,
      level2Content: groupItem.description || '',
      value: '',
      isGroup: true,
      groupChildren: groupItem.children.map((child) => {
        return this.createFieldItem(child);
      })
    };
  },

  /**
   * 创建单个项目
   */
  createSingleItem(item) {
    const fieldItem = this.createFieldItem(item);
    return {
      ...fieldItem,
      isGroup: false
    };
  },

  /**
   * 创建字段项目，保持原始结构
   */
  createFieldItem(item) {
    const fieldItem = {
      ...item,
      level2Code: item.fieldCode,
      level2Name: item.title,
      level2Content: item.description || '',
      value: item.defaultValue || '',
      isVisible: this.getFieldVisibility(item),
      dataKey: item.fieldCode // 直接使用 fieldCode 作为数据键
    };
    
    // 如果有 subField，为其设置正确的数据键和显示状态
    if (item.subField) {
      fieldItem.subField = {
        ...item.subField,
        // subField 直接使用自己的 fieldCode 作为数据键
        dataKey: item.subField.fieldCode
      };
      
      // 初始化 subField 描述框的显示状态
      if (item.type === 'single_choice' && item.subField.type === 'text') {
        fieldItem.showSubFieldDescription = false; // 默认隐藏，等待选择值来决定
      }
    }
    
    return fieldItem;
  },

  /**
   * 获取字段的初始可见性
   */
  getFieldVisibility(item) {
    // 如果有 dependsOn，则默认隐藏（等待依赖项的值来决定）
    if (item.dependsOn) {
      return false;
    }
    
    // 如果是 subField，检查 subField 的依赖关系
    if (item.subField) {
      // 如果 subField 有 dependsOn，则 subField 默认隐藏
      if (item.subField.dependsOn) {
        // 主字段显示，subField 根据依赖关系显示
        return true;
      }
      
      // 没有依赖关系的 subField 组合
      if (item.type === 'text' && item.subField.type === 'single_choice') {
        // text + single_choice subField: 都应该一直显示
        return true;
      }
      if (item.type === 'single_choice' && item.subField.type === 'text') {
        // single_choice + text subField: 主选择显示，描述框根据选择值显示
        return true;
      }
    }
    
    // 默认显示
    return true;
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
        // 1. 如果不可见跳过
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
      // 1. 如果不可见跳过
      if (currentItem.isVisible === false) {
        console.log('跳过不可见项目:', currentItem.fieldCode);
        return true;
      }
      
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
    
    // 纯文本类型：不需要验证，直接返回true（即使数据为空）
    if (item.type === 'text') {
      console.log(`纯文本字段跳过验证: ${item.fieldCode}`);
      return true;
    }
    
    // 其他类型：如果是单选、多选和number必须要有值不能为空
    if (!fieldData) {
      console.log('字段数据为空');
      return false;
    }
    
    // 处理有 subField 的情况
    if (item.subField) {
      return this.validateSubFieldData(item, fieldData);
    }
    
    // 处理普通字段类型
    switch (item.type) {
      case 'single_choice':
        // 单选题：必须有值
        const singleChoiceComplete = fieldData.selectedValue !== undefined && fieldData.selectedValue !== '';
        console.log(`单选题完整性: ${singleChoiceComplete}, selectedValue: ${fieldData.selectedValue}`);
        return singleChoiceComplete;
        
      case 'multiple_choice':
        // 多选题：必须有值
        const multipleChoiceComplete = fieldData.selectedValues && fieldData.selectedValues.length > 0;
        console.log(`多选题完整性: ${multipleChoiceComplete}, selectedValues:`, fieldData.selectedValues);
        return multipleChoiceComplete;
        
      case 'number':
        // 数字类型：必须有值
        const numberComplete = fieldData.value !== undefined && fieldData.value !== '' && fieldData.value !== null;
        console.log(`数字完整性: ${numberComplete}, value: ${fieldData.value}`);
        return numberComplete;
        
      default:
        console.log('未知字段类型，默认返回true');
        return true;
    }
  },

  /**
   * 验证包含 subField 的字段数据
   */
  validateSubFieldData(item, fieldData) {
    const { subField } = item;
    
    if (item.type === 'text' && subField.type === 'single_choice') {
      // text + single_choice subField：文本不验证，只验证单选部分
      if (!fieldData) {
        // 如果数据为空，对于text类型直接返回true（不验证）
        console.log(`text+subField数据为空，跳过验证`);
        return true;
      }
      const radioComplete = fieldData.subSelectedValue !== undefined && fieldData.subSelectedValue !== '';
      console.log(`text+subField完整性: ${radioComplete}, radio: ${fieldData.subSelectedValue}`);
      return radioComplete;
    }
    
    if (item.type === 'single_choice' && subField.type === 'text') {
      // single_choice + text subField：主选择必填，描述框如果显示则也必填
      if (!fieldData) {
        console.log(`single_choice+subField数据为空`);
        return false;
      }
      const mainComplete = fieldData.selectedValue !== undefined && fieldData.selectedValue !== '';
      console.log(`single_choice+subField - 主选择: ${mainComplete}, selectedValue: ${fieldData.selectedValue}`);
      
      if (!mainComplete) {
        return false;
      }
      
      // 判断描述框是否显示，如果显示则需要验证
      const needsDescription = this.shouldShowSubFieldDescription(item, fieldData.selectedValue);
      if (needsDescription) {
        const descComplete = fieldData.description !== undefined && fieldData.description !== '';
        console.log(`subField描述框显示且需要验证 - 完整性: ${descComplete}, description: ${fieldData.description}`);
        return descComplete;
      }
      
      console.log(`subField描述框未显示，跳过描述验证`);
      return true;
    }
    
    if (item.type === 'number' && subField) {
      // number + subField：数字必须有值
      if (!fieldData) {
        console.log(`number+subField数据为空`);
        return false;
      }
      const numberComplete = fieldData.value !== undefined && fieldData.value !== '' && fieldData.value !== null;
      console.log(`number+subField完整性: ${numberComplete}, value: ${fieldData.value}`);
      
      // 如果主字段不完整，直接返回false
      if (!numberComplete) {
        return false;
      }
      
      // 检查subField（如果是单选类型）
      if (subField.type === 'single_choice') {
        const subComplete = fieldData.subSelectedValue !== undefined && fieldData.subSelectedValue !== '';
        console.log(`number+subField单选完整性: ${subComplete}, subSelectedValue: ${fieldData.subSelectedValue}`);
        return subComplete;
      }
      
      return true;
    }
    
    // 其他 subField 组合，默认返回 true
    console.log('未知subField组合，默认返回true');
    return true;
  },

  /**
   * 判断是否应该显示 subField 描述框
   */
  shouldShowSubFieldDescription(item, selectedValue) {
    // 如果 subField 有明确的依赖关系，使用依赖关系判断
    if (item.subField && item.subField.dependsOn && item.subField.showWhenValue) {
      return selectedValue === item.subField.showWhenValue;
    }
    
    // 其他情况：选择 "1"（是）时显示描述框
    return selectedValue === '1';
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
      // 描述输入使用专门的dataKey（通常是subField的fieldCode）
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
      // 对于 subField，使用传入的 datakey（通常是 subField.fieldCode）
      this.data.param[finalKey] = value;
    }
    
    // 检查并更新页面完整性状态
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 更新依赖项的显示状态
   */
  updateDependentItemsVisibility(fieldcode, selectedValue) {
    console.log(`更新依赖项显示状态 - fieldcode: ${fieldcode}, selectedValue: ${selectedValue}`);
    
    // 检查所有页面的依赖关系，而不仅仅是当前页面
    this.data.scoreList.forEach((item, itemIndex) => {
      if (item.isGroup && item.groupChildren) {
        // 处理分组项目的依赖关系
        item.groupChildren.forEach((subItem, subIndex) => {
          if (subItem.dependsOn === fieldcode) {
            const shouldShow = selectedValue === subItem.showWhenValue;
            console.log(`检查依赖项 ${subItem.fieldCode} - 依赖于 ${fieldcode}, 应该显示: ${shouldShow}`);
            
            this.setData({
              [`scoreList[${itemIndex}].groupChildren[${subIndex}].isVisible`]: shouldShow
            });
            
            // 如果隐藏了依赖项，清空其数据
            if (!shouldShow) {
              console.log(`隐藏依赖项 ${subItem.fieldCode}，清空其数据`);
              this.clearDependentItemData(subItem);
            }
          }
        });
      } else {
        // 处理单个项目的依赖关系
        if (item.dependsOn === fieldcode) {
          const shouldShow = selectedValue === item.showWhenValue;
          console.log(`检查依赖项 ${item.fieldCode} - 依赖于 ${fieldcode}, 应该显示: ${shouldShow}`);
          
          this.setData({
            [`scoreList[${itemIndex}].isVisible`]: shouldShow
          });
          
          // 如果隐藏了依赖项，清空其数据
          if (!shouldShow) {
            console.log(`隐藏依赖项 ${item.fieldCode}，清空其数据`);
            this.clearDependentItemData(item);
          }
        }
      }
    });
    
    // 依赖项显示状态改变后，重新检查页面完整性
    this.checkAndUpdatePageCompleteness();
  },

  /**
   * 清空依赖项的数据
   */
  clearDependentItemData(item) {
    const fieldcode = item.fieldCode;
    console.log(`清空依赖项数据 - fieldcode: ${fieldcode}`);
    
    // 清空formData
    if (this.data.formData[fieldcode]) {
      delete this.data.formData[fieldcode];
      console.log(`已删除formData[${fieldcode}]`);
    }
    
    // 清空param中的主字段数据
    if (item.dataKey && this.data.param[item.dataKey]) {
      delete this.data.param[item.dataKey];
      console.log(`已删除param[${item.dataKey}]`);
    }
    
    // 如果有 subField，也要清空 subField 的数据
    if (item.subField && item.subField.fieldCode) {
      const subFieldKey = item.subField.fieldCode;
      if (this.data.param[subFieldKey]) {
        delete this.data.param[subFieldKey];
        console.log(`已删除param[${subFieldKey}]`);
      }
    }
    
    // 强制刷新整个formData对象，确保页面数据更新
    this.setData({
      formData: this.data.formData
    });
    console.log(`已刷新formData，当前formData:`, this.data.formData);
  },

  /**
   * 更新描述输入框的显示状态
   */
  updateDescriptionVisibility(fieldcode, selectedValue) {
    const currentItem = this.data.scoreList[this.data.position];
    
    // 检查当前项是否有描述功能（旧格式）
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
    
    // 检查当前项是否有 subField 功能（新格式）
    if (currentItem.subField && currentItem.fieldCode === fieldcode) {
      if (currentItem.subField.type === 'text') {
        // subField 为 text 类型，处理描述框显隐
        const showDescription = this.shouldShowSubFieldDescription(currentItem, selectedValue);
        this.setData({
          [`scoreList[${this.data.position}].showSubFieldDescription`]: showDescription
        });
        
        // 如果隐藏描述框，清空描述内容
        if (!showDescription) {
          this.clearSubFieldDescriptionData(currentItem, fieldcode);
        }
      } else {
        // subField 为其他类型（如 single_choice），需要清空 subField 的值
        this.clearSubFieldData(currentItem, fieldcode);
      }
    }
    
    // 如果是分组，检查子项
    if (currentItem.isGroup && currentItem.groupChildren) {
      currentItem.groupChildren.forEach((subItem, subIndex) => {
        // 检查旧格式的描述功能
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
        
        // 检查新格式的 subField 功能
        if (subItem.fieldCode === fieldcode && subItem.subField) {
          if (subItem.subField.type === 'text') {
            // subField 为 text 类型，处理描述框显隐
            const showDescription = this.shouldShowSubFieldDescription(subItem, selectedValue);
            this.setData({
              [`scoreList[${this.data.position}].groupChildren[${subIndex}].showSubFieldDescription`]: showDescription
            });
            
            // 如果隐藏描述框，清空描述内容
            if (!showDescription) {
              this.clearSubFieldDescriptionData(subItem, fieldcode);
            }
          } else {
            // subField 为其他类型（如 single_choice），需要清空 subField 的值
            this.clearSubFieldData(subItem, fieldcode);
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
   * 清空 subField 描述相关数据
   */
  clearSubFieldDescriptionData(item, fieldcode) {
    console.log(`清空subField描述数据 - fieldcode: ${fieldcode}, item:`, item);
    
    // 清空formData中的描述
    if (this.data.formData[fieldcode]) {
      // 同时更新 this.data.formData 和页面数据
      this.data.formData[fieldcode].description = '';
      
      // 强制更新页面数据，确保输入框立即清空
      this.setData({
        formData: this.data.formData
      });
      
      console.log(`已清空formData[${fieldcode}].description`);
    }
    
    // 清空param中的描述数据（subField的描述使用subField的fieldCode作为key）
    if (item.subField && item.subField.fieldCode) {
      const subFieldKey = item.subField.fieldCode;
      if (this.data.param[subFieldKey]) {
        delete this.data.param[subFieldKey];
        console.log(`已清空param[${subFieldKey}]`);
      }
    }
  },

  /**
   * 清空 subField 相关数据（适用于所有类型的 subField）
   */
  clearSubFieldData(item, fieldcode) {
    console.log(`清空subField数据 - fieldcode: ${fieldcode}, subField类型: ${item.subField?.type}`);
    
    if (!item.subField) {
      return;
    }
    
    // 清空formData中的subField相关数据
    if (this.data.formData[fieldcode]) {
      if (item.subField.type === 'single_choice') {
        // 清空单选值
        this.data.formData[fieldcode].subSelectedValue = '';
        console.log(`已清空formData[${fieldcode}].subSelectedValue`);
      } else if (item.subField.type === 'text') {
        // 清空文本描述
        this.data.formData[fieldcode].description = '';
        console.log(`已清空formData[${fieldcode}].description`);
      } else if (item.subField.type === 'multiple_choice') {
        // 清空多选值
        this.data.formData[fieldcode].subSelectedValues = [];
        console.log(`已清空formData[${fieldcode}].subSelectedValues`);
      }
      
      // 强制更新页面数据
      this.setData({
        formData: this.data.formData
      });
    }
    
    // 清空param中的subField数据
    if (item.subField.fieldCode) {
      const subFieldKey = item.subField.fieldCode;
      if (this.data.param[subFieldKey]) {
        delete this.data.param[subFieldKey];
        console.log(`已清空param[${subFieldKey}]`);
      }
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
    console.log('handleCheckboxChange', value)
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
   * 获取最终的JSON数据格式
   */
  getFinalJsonData() {
    const result = {};
    
    // 首先收集所有应该提交的字段
    const allFields = this.getAllFieldCodes();
    
    // 为每个字段设置值
    allFields.forEach(fieldInfo => {
      const key = fieldInfo.fieldCode;
      const value = this.data.param[key];
      
      if (value !== undefined && value !== null && value !== '') {
        // 有值的情况，直接使用
        result[key] = value;
      } else {
        // 空值的情况，根据字段类型设置默认值
        if (fieldInfo.type === 'number') {
          // number 类型使用默认值，如果没有默认值则用 null
          result[key] = fieldInfo.defaultValue !== undefined ? fieldInfo.defaultValue : null;
        } else if (fieldInfo.type === 'text') {
          // text 类型使用空字符串
          result[key] = '';
        } else {
          // 其他类型使用 null
          result[key] = null;
        }
      }
    });
    
    return result;
  },

  /**
   * 获取所有字段的信息（包括主字段和subField）
   */
  getAllFieldCodes() {
    const allFields = [];
    
    this.data.scoreList.forEach(item => {
      if (item.isGroup && item.groupChildren) {
        // 处理分组项目
        item.groupChildren.forEach(subItem => {
          // 添加主字段
          allFields.push({
            fieldCode: subItem.fieldCode,
            type: subItem.type,
            defaultValue: subItem.defaultValue
          });
          
          // 如果有 subField，也添加
          if (subItem.subField) {
            allFields.push({
              fieldCode: subItem.subField.fieldCode,
              type: subItem.subField.type,
              defaultValue: subItem.subField.defaultValue
            });
          }
        });
      } else {
        // 处理单个项目
        // 添加主字段
        allFields.push({
          fieldCode: item.fieldCode,
          type: item.type,
          defaultValue: item.defaultValue
        });
        
        // 如果有 subField，也添加
        if (item.subField) {
          allFields.push({
            fieldCode: item.subField.fieldCode,
            type: item.subField.type,
            defaultValue: item.subField.defaultValue
          });
        }
      }
    });
    
    return allFields;
  },

  /**
   * 根据数据键查找对应的字段信息
   */
  findFieldInfoByKey(key) {
    // 遍历所有字段，查找匹配的 fieldCode
    for (let item of this.data.scoreList) {
      if (item.isGroup && item.groupChildren) {
        for (let subItem of item.groupChildren) {
          // 检查主字段
          if (subItem.fieldCode === key) {
            return subItem;
          }
          // 检查 subField
          if (subItem.subField && subItem.subField.fieldCode === key) {
            return subItem.subField;
          }
        }
      } else {
        // 检查主字段
        if (item.fieldCode === key) {
          return item;
        }
        // 检查 subField
        if (item.subField && item.subField.fieldCode === key) {
          return item.subField;
        }
      }
    }
    return null;
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

    console.log('convertedFormData', JSON.stringify(convertedFormData))
    
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
    // 基于现有的formData进行更新，而不是创建新的空对象
    const formData = { ...this.data.formData };
    
    console.log('开始转换数据，scoreList:', this.data.scoreList);
    console.log('现有formData:', formData);
    
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
    
    console.log('转换完成的formData:', formData);
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
    
    // 处理有 subField 的情况
    if (item.subField) {
      if (item.type === 'text' && item.subField.type === 'single_choice') {
        // text + single_choice subField
        const textKey = item.fieldCode; // 直接使用 fieldCode
        const radioKey = item.subField.fieldCode; // subField 使用自己的 fieldCode
        console.log(`text+subField - textKey: ${textKey}, radioKey: ${radioKey}`);
        
        if (flatData[textKey] !== undefined && flatData[textKey] !== null) {
          formData[fieldCode].value = String(flatData[textKey]);
        }
        if (flatData[radioKey] !== undefined && flatData[radioKey] !== null) {
          formData[fieldCode].subSelectedValue = flatData[radioKey];
        }
      } else if (item.type === 'single_choice' && item.subField.type === 'text') {
        // single_choice + text subField
        const mainKey = item.fieldCode; // 直接使用 fieldCode
        const descKey = item.subField.fieldCode; // subField 使用自己的 fieldCode
        console.log(`single_choice+subField - mainKey: ${mainKey}, descKey: ${descKey}`);
        
        if (flatData[mainKey] !== undefined && flatData[mainKey] !== null) {
          formData[fieldCode].selectedValue = flatData[mainKey];
        }
        if (flatData[descKey] !== undefined && flatData[descKey] !== null) {
          formData[fieldCode].description = flatData[descKey];
        }
      }
      return; // 有 subField 的情况已处理完毕，直接返回
    }
    
    // 处理普通字段类型
    switch (item.type) {
      case 'single_choice':
        // 单选题：直接使用 fieldCode
        const singleChoiceKey = item.fieldCode;
        console.log(`单选题 - fieldCode: ${singleChoiceKey}, 值: ${flatData[singleChoiceKey]}`);
        if (flatData[singleChoiceKey] !== undefined && flatData[singleChoiceKey] !== null) {
          formData[fieldCode].selectedValue = flatData[singleChoiceKey];
        }
        break;
        
      case 'multiple_choice':
        // 多选题：直接使用 fieldCode
        const multipleChoiceKey = item.fieldCode;
        console.log(`多选题处理 - 字段: ${fieldCode}, fieldCode: ${multipleChoiceKey}`);
        console.log(`原始值: "${flatData[multipleChoiceKey]}", 类型: ${typeof flatData[multipleChoiceKey]}`);
        console.log(`现有formData[${fieldCode}]:`, formData[fieldCode]);
        
        if (flatData[multipleChoiceKey] !== undefined && flatData[multipleChoiceKey] !== '' && flatData[multipleChoiceKey] !== null) {
          const selectedArray = flatData[multipleChoiceKey].split(',');
          formData[fieldCode].selectedValues = selectedArray;
          console.log(`多选题设置成功 - formData[${fieldCode}].selectedValues =`, selectedArray);
        } else {
          // 如果没有现有数据，确保多选题有默认的空数组
          if (!formData[fieldCode].selectedValues) {
            formData[fieldCode].selectedValues = [];
          }
          console.log(`多选题数据为空或未定义，保持现有值:`, formData[fieldCode].selectedValues);
        }
        break;
        
      case 'text':
      case 'number':
        // 文本/数字输入：直接使用 fieldCode
        const textKey = item.fieldCode;
        console.log(`文本/数字输入 - 字段: ${fieldCode}, fieldCode: ${textKey}, 原始值: ${flatData[textKey]}, 类型: ${typeof flatData[textKey]}`);
        if (flatData[textKey] !== undefined && flatData[textKey] !== null) {
          formData[fieldCode].value = String(flatData[textKey]); // 确保转为字符串
          console.log(`设置成功 - formData[${fieldCode}].value = ${formData[fieldCode].value}`);
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
          // 处理普通字段的依赖关系
          if (subItem.dependsOn) {
            // 查找依赖的字段值
            const dependentFieldData = this.data.formData[subItem.dependsOn];
            if (dependentFieldData && dependentFieldData.selectedValue !== undefined) {
              const shouldShow = dependentFieldData.selectedValue === subItem.showWhenValue;
              this.setData({
                [`scoreList[${itemIndex}].groupChildren[${subIndex}].isVisible`]: shouldShow
              });
            }
          }
          
          // 处理 subField 的依赖关系和描述框显示
          if (subItem.subField) {
            const fieldData = this.data.formData[subItem.fieldCode];
            if (fieldData && fieldData.selectedValue !== undefined) {
              // 更新 subField 描述框显示状态
              const shouldShowSubFieldDescription = this.shouldShowSubFieldDescription(subItem, fieldData.selectedValue);
              this.setData({
                [`scoreList[${itemIndex}].groupChildren[${subIndex}].showSubFieldDescription`]: shouldShowSubFieldDescription
              });
            }
          }
          
          // 更新旧格式描述框显示状态
          if (subItem.hasDescription) {
            const fieldData = this.data.formData[subItem.fieldCode];
            if (fieldData && fieldData.selectedValue !== undefined) {
              const shouldShowDescription = fieldData.selectedValue === subItem.descriptionTriggerCode;
              this.setData({
                [`scoreList[${itemIndex}].groupChildren[${subIndex}].showDescription`]: shouldShowDescription
              });
            }
          }
        });
      } else {
        // 处理单个项目的 subField 描述框显示状态
        if (item.subField) {
          const fieldData = this.data.formData[item.fieldCode];
          if (fieldData && fieldData.selectedValue !== undefined) {
            const shouldShowSubFieldDescription = this.shouldShowSubFieldDescription(item, fieldData.selectedValue);
            this.setData({
              [`scoreList[${itemIndex}].showSubFieldDescription`]: shouldShowSubFieldDescription
            });
          }
        }
        
        // 处理单个项目的旧格式描述框显示状态
        if (item.hasDescription) {
          const fieldData = this.data.formData[item.fieldCode];
          if (fieldData && fieldData.selectedValue !== undefined) {
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
