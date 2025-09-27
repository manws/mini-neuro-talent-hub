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
  return postRequest('/api/v2/User/login', param)
}

const changePwd = param => {
  return putRequest('/api/v2/User/change-pwd', param)
}

const logout = param => {
  return postRequest('/api/v2/User/logout', param)
}

const projects = param => {
  return getRequest('/api/v2/projects', param)
}

const listSubject = param => {
  const projectDB = getApp().globalData.project.projectDB
  return postRequest(`/api/v2/list-subject/${projectDB}`, param)
}

const newSubject = () => {
  const projectDB = getApp().globalData.project.projectDB
  return getRequest(`/api/v2/new-subject/${projectDB}`)
}

const getSubject = subjectId => {
  const projectDB = getApp().globalData.project.projectDB
  return getRequest(`/api/v2/subjects/${projectDB}/${subjectId}`)
}

const addSubject = param => {
  const projectDB = getApp().globalData.project.projectDB
  return postRequest(`/api/v2/subjects/${projectDB}`, param)
}

const updateSubject = (subjectId, param) => {
  const projectDB = getApp().globalData.project.projectDB
  return putRequest(`/api/v2/subjects/${projectDB}/${subjectId}`, param)
}


module.exports = {
  login,
  logout,
  projects,
  listSubject,
  newSubject,
  getSubject,
  addSubject,
  updateSubject
}