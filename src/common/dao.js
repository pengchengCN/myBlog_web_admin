import axios from 'axios'
import CFG from './cfg'
import util from '../common/util.js'

const BASEURL = `${CFG.BASEURL}`
const instance = axios.create({
  baseURL: BASEURL,
  dataType: 'json',
  timeout: 5000,
  transformResponse: [function (data) {
    data = JSON.parse(data)
    if (data.code !== '200') return util.messageMethod('error', data.data)
    return data
  }]
})

class Dao {
  constructor () {
  }
  apiGet (key) {
    return instance.get(key)
  }
  apiPost (key, body) {
    return instance.post(key, body)
  }
  // 登录
  login (body) {
    return this.apiPost('login', body)
  }
  // 获取个人信息
  getUser (body) {
    return this.apiPost('getUser', body)
  }
  // 获取全部分类
  catAll () {
    return this.apiGet('categoryAll')
  }
  // 获取全部标签
  labAll () {
    return this.apiGet('labelAll')
  }
  // 获取全部文章
  articleAll () {
    return this.apiGet('articleAll')
  }
  // 文章图片上传
  articleImg (body) {
    return this.apiPost('articleImg', body)
  }
  // 文章提交
  newArticle (body) {
    return this.apiPost('insertArticle', body)
  }
}
const aDao = new Dao()
export default aDao