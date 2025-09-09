// var base_url = wx.getAccountInfoSync().miniProgram.envVersion == 'develop' ? 'https://ctmstest.xhedc.com' : 'https://ctms.xhedc.com'
const base_url = 'https://iwrs.xhedc.com'
/**
 * 请求头
 */
var header = {
  'content-type': 'application/json;charset=UTF-8',
  'os': 'wx',
  'version': '1.0.2'
}

/**
 * 供外部post请求调用  
 */
function post(url, params, isReject = true) {
  return request(url, params, "POST", isReject);
}

/**
 * 供外部get请求调用
 */
function get(url, params, isReject = true) {
  return request(url, params, "GET", isReject);
}

/**
 * 供外部put请求调用
 */
function put(url, params, isReject = true) {
  return request(url, params, "PUT", isReject);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST/PUT
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, isReject = true) {
  let token = getApp().globalData.token ? getApp().globalData.token : wx.getStorageSync('token')
  if (token) {
    header.Authorization = token;
  }
  let cookie = getApp().globalData.cookie ? getApp().globalData.cookie : wx.getStorageSync('cookie')
 console.log(cookie, ' cookie')
  if (cookie) {
    header.Cookie = cookie;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url + url,
      data: dealParams(params),
      method: method,
      header: header,
      success: function (res) {
        console.log("request-success", res)
        const {
          data,
          header,
          statusCode
        } = res
        // 这里先清空所有界面然后跳转到登录界面去
        // data.data为空就是token失效了----todo jb 修改
        if (statusCode === 200) {
          const {
            code,
            result,
            message
          } = data
          if (data.code == 4001 || !data) {
            handleTokenFail()
          } else if (code === 200 && result) {
            const token = header.Authorization
            if (token) {
              getApp().globalData.token = token
              wx.setStorageSync('token', token)
            }
            resolve(data.data ? data.data : result)
          } else {
            if (isReject) {
              wx.hideLoading()
              wx.showToast({
                title: message ? message : '请求失败',
                icon: 'none'
              })
              reject(message ? message : '请求失败')
            } else {
              resolve({
                status: false,
                data: message ? message : '请求失败'
              })
            }
          }
        } else {
          if (isReject) {
            wx.hideLoading()
            wx.showToast({
              title: "请求异常",
              icon: 'none'
            })
            reject("请求异常")
          } else {
            resolve({
              status: false,
              data: "请求异常"
            })
          }
        }
      },
      fail: function (error) {
        if (isReject) {
          wx.hideLoading()
          wx.showToast({
            title: "请求异常",
            icon: 'none'
          })
          reject("请求异常")
        } else {
          resolve({
            status: false,
            data: "请求异常"
          })
        }
      }
    })
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  return params;
}

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


// 1.通过module.exports方式提供给外部调用
module.exports = {
  request: request,
  postRequest: post,
  getRequest: get,
  putRequest: put,
  baseUrl: base_url
}