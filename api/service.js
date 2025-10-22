import {
  request,
  postRequest,
  getRequest,
  putRequest,
  baseUrl
} from '../utils/request'

/**
 * 登录
 */
const login = param => {
  return postRequest('/api/v2/User/login/wx', param)
}

const changePwd = param => {
  return postRequest('/api/v2/User/changePwd', param)
}

const logout = param => {
  return postRequest('/api/v2/User/logout', param)
}

// UserScore 相关接口
const userScoreWxList = param => {
  return postRequest('/api/v2/UserScore/wxList', param)
}

const userScoreWxLast = param => {
  return postRequest('/api/v2/UserScore/wxLast', param)
}

const userScoreInsert = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/Insert/${scoreTypeId}`, param)
}

const userScoreUpdate = (scoreTypeId, levelId, param) => {
  return postRequest(`/api/v2/UserScore/update/${scoreTypeId}/${levelId}`, param)
}

const userScoreSingle0 = (scoreTypeId, levelId, param) => {
  return postRequest(`/api/v2/UserScore/singleL0/${scoreTypeId}/${levelId}`, param)
}

const userScorePage = param => {
  return postRequest('/api/v2/UserScore/page', param)
}

const userScoreSingleAll = (userId, scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/singleAll/${userId}/${scoreTypeId}`, param)
}

const userScoreSingleAllL1 = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/singleAllL1/${scoreTypeId}`, param)
}

const userScoreSingleAllL2 = (scoreTypeId, param) => {
  return postRequest(`/api/v2/UserScore/singleAllL2/${scoreTypeId}`, param)
}

const userScoreRadar = (param = {}) => {
  return postRequest(`/api/v2/UserScore/radar`, param)
}

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
  userScoreRadar
}