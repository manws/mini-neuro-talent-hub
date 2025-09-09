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
  return postRequest('/api/v1/login', param)
}

const changePwd = param => {
  return putRequest('/api/v1/change-pwd', param)
}

const logout = param => {
  return postRequest('/api/v1/logout', param)
}

const projects = param => {
  return getRequest('/api/v1/projects', param)
}

const listSubject = param => {
  const projectDB = getApp().globalData.project.projectDB
  return postRequest(`/api/v1/list-subject/${projectDB}`, param)
}

const newSubject = () => {
  const projectDB = getApp().globalData.project.projectDB
  return getRequest(`/api/v1/new-subject/${projectDB}`)
}

const getSubject = subjectId => {
  const projectDB = getApp().globalData.project.projectDB
  return getRequest(`/api/v1/subjects/${projectDB}/${subjectId}`)
}

const addSubject = param => {
  const projectDB = getApp().globalData.project.projectDB
  return postRequest(`/api/v1/subjects/${projectDB}`, param)
}

const updateSubject = (subjectId, param) => {
  const projectDB = getApp().globalData.project.projectDB
  return putRequest(`/api/v1/subjects/${projectDB}/${subjectId}`, param)
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