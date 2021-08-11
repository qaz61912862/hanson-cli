const axios = require('axios')
const GITHUB_ACCOUNT = 'hanson774612160';

axios.interceptors.response.use(res => {
  return res.data;
})

// 获取模板列表
async function getRepoList () {
  return axios.get(`https://api.github.com/orgs/${GITHUB_ACCOUNT}/repos`)
}

// 获取版本信息
async function getTagList (repo) {
  return axios.get(`https://api.github.com/repos/${GITHUB_ACCOUNT}/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}
