// pages/evaluation/index.js
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
    tsValue01: 0,
    tsValue02: 0,
    tsValue03: 0,
    tsValue04: 0,
    tsValue05: 0
  },
  onChange1(event) {
    this.setData({
      tsValue01: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      tsValue02: event.detail,
    });
  },
  onChange3(event) {
    this.setData({
      tsValue03: event.detail,
    });
  },
  onChange4(event) {
    this.setData({
      tsValue04: event.detail,
    });
  },
  onChange5(event) {
    this.setData({
      tsValue05: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id, scoreTypeId } = options;
    console.log("接收到的参数:", { id, scoreTypeId });

    // 保存页面参数到data中
    this.setData({
      id,
      scoreTypeId,
    });

    
    if (scoreTypeId) {
     this.GetUserScore6(scoreTypeId);
    }
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

  },
  back() {
    wx.navigateBack();
  },
  previous() {
    this.setData({
      position: this.data.position - 1,
    });
  },
  next() {
    if (this.data.position < this.data.scoreList.length) {
      this.setData({
        position: this.data.position + 1,
      });
    }
  },

  /**
   * 处理输入框输入事件
   */
  handleInpput(e) {
    const { value } = e.detail;
    const { data } = e.currentTarget.dataset;
    // 更新当前位置的评分数据
    if (value) {
      this.data.param[data.level2Code] = value;
    } else {
      this.data.param[data.level2Code] = "0";
    }
  },
  /**
   * 提交表单数据
   */
  async submit() {
    // 获取页面参数
    const { scoreTypeId, id } = this.data;
    const  isCheked = this.data.tsValue01 == 0 || this.data.tsValue02 == 0 || this.data.tsValue03 == 0|| this.data.tsValue04 == 0|| this.data.tsValue05 == 0
    if (isCheked) {
      wx.showToast({
        title: '评分不完整请检查',
        icon: "none"
      })
      return
    }
    await this.updateUserScore6(scoreTypeId, id);
  },

  /**
   * 调用singleL0接口
   */
  async GetUserScore6(scoreTypeId) {
    try {
      const { contentResult } = await wx.API.contentResult(scoreTypeId, 6)
      console.log("singleL0接口调用成功:", contentResult, parseInt(contentResult.Q1));
      if (contentResult) {
        // 将数据存储到页面数据中
        this.setData({
          tsValue01: parseInt(contentResult.Q1),
          tsValue02: parseInt(contentResult.Q2),
          tsValue03: parseInt(contentResult.Q3),
          tsValue04: parseInt(contentResult.Q4),
          tsValue05: parseInt(contentResult.Q5)
        });
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
  async updateUserScore6(scoreTypeId, levelId) {
    try {
      const param = {
        Q1: this.data.tsValue01,
        Q2: this.data.tsValue02,
        Q3: this.data.tsValue03,
        Q4: this.data.tsValue04,
        Q5: this.data.tsValue05,
      };
      const { scoreResult } = await wx.API.SaveContent(
        scoreTypeId, 6,
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
    const index = this.data.position;
    const item = this.data.scoreList[index];
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
    const index = e.detail.index
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
});
