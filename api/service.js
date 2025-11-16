import {
  request,
  postRequest,
  getRequest,
  putRequest,
  baseUrl,
  token_flag
} from "../utils/request";
import FormData from "../utils/formdata/formdata.js";

/**
 * 登录
 */
const login = (param) => {
  return postRequest("/api/v2/User/login/wx", param);
};

const changePwd = (param) => {
  return postRequest("/api/v2/User/changePwd", param);
};

const logout = (param) => {
  return postRequest("/api/v2/User/logout", param);
};

// UserScore 相关接口
const userScoreWxList = (param) => {
  return postRequest("/api/v2/UserScore/wxList", param);
};

const userScoreWxLast = (param) => {
  return postRequest("/api/v2/UserScore/wxLast", param);
};

const userScoreInsert = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/Insert/${scoreTypeId}`, param);
};

const userScoreUpdate = (scoreTypeId, levelId, param) => {
  return postRequest(
    `/api/v2/UserScore/update/${scoreTypeId}/${levelId}`,
    param
  );
};

const userScoreSingle0 = (scoreTypeId, levelId, param) => {
  return postRequest(
    `/api/v2/UserScore/singleL0/${scoreTypeId}/${levelId}`,
    param
  );
};

const userScorePage = (param) => {
  return postRequest("/api/v2/UserScore/page", param);
};

const userScoreSingleAll = (userId, scoreTypeId, param) => {
  return postRequest(
    `/api/v2/UserScore/singleAll/${userId}/${scoreTypeId}`,
    param
  );
};

const userScoreSingleAllL1 = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/singleAllL1/${scoreTypeId}`, param);
};

const userScoreSingleAllL2 = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/singleAllL2/${scoreTypeId}`, param);
};

const userScoreRadar = (param = {}) => {
  return postRequest(`/api/v2/UserScore/radar`, param);
};

const uploadImage = (scoreTypeId, level0Id, level1Id, level2code, file) => {
  // 验证文件参数
  if (!file || !file.url) {
    return Promise.resolve({
      status: false,
      data: "文件参数无效"
    });
  }
  
  let formData = new FormData();
  formData.appendFile("file", file.url);
  const data = formData.getData();
  const token = getApp().globalData.token ? getApp().globalData.token : wx.getStorageSync("token")
  let header = {
    "content-type": data.contentType, // 使用 FormData 生成的完整 contentType，包含 boundary
    os: "wx",
    version: "1.0.2",
  };
  header[token_flag] = token;
  return new Promise((resolve, reject) => {
    wx.request({
      url:
        baseUrl + `/api/v2/Image/uploadImage/${scoreTypeId}/${level0Id}/${level1Id}/${level2code}`,
      method: "POST",
      header: header,
      data: data.buffer,
      success: (res) => {
        const { data, header, statusCode } = res;
        if (statusCode === 200) {
          const {
            code,
            result,
            message
          } = data
          if (data.code == 255) {
            handleTokenFail()
          } else if (code === 200 && result) {
            const token = header[token_flag]
            if (token) {
              getApp().globalData.token = token
              wx.setStorageSync('token', token)
            }
            resolve(data.data ? data.data : result)
          } else {
            resolve({
              status: false,
              data: message ? message : '请求失败'
            })
          }
        } else {
          resolve({
            status: false,
            data: "请求异常"
          })
        }
      },
      fail: (err) => {
        resolve({
          status: false,
          data: "请求异常"
        })
      },
    });
  });
};

function handleTokenFail() {
  wx.hideLoading()
  // 清除所有缓存数据
  wx.clearStorageSync()
  wx.showModal({
    title: '提示',
    content: '当前账号已超时或在异地登录，点击确定跳转到登录界面。',
    showCancel: false,
    confirmText: '确定',
    complete: () => {
      wx.reLaunch({
        url: '/pages/launcher/index'
      });
    }
  })
}

const delImage = (fileName) => {
  return postRequest(`/api/v2/Image/delImage`, { fileName });
};

// /api/v2/Image/level2ImageList/{scoreTypeId}/{levelId}/{level1Id}/{level2Code}

module.exports = {
  login,
  changePwd,
  logout,
  userScoreWxList,
  userScoreWxLast,
  userScoreInsert,
  userScoreUpdate,
  userScoreSingle0,
  userScorePage,
  userScoreSingleAll,
  userScoreSingleAllL1,
  userScoreSingleAllL2,
  userScoreRadar,
  uploadImage,
  delImage,
};
