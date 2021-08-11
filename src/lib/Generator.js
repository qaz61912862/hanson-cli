// 提示消息的
const ora = require('ora')
// 询问用户的
const inquirer = require('inquirer')
// 从github上拉取项目、Tags
const { getRepoList, getTagList } = require('./http')
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const chalk = require('chalk')

async function wrapLoading (fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args)
    spinner.succeed();
    return result
  } catch (error) {
    spinner.fail('Request failed, refetch ...')
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  // 核心创建逻辑
  // 选择模版
  async getRepo () {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;
    const repos = repoList.map(item => item.name); // [ 'vue3.0-template', 'vue-template' ]
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })
    return repo;
  }
  // 选择标签Tag
  async getTag (repo) {
    // 1）从远程拉取模板数据
    const tagList = await wrapLoading(getTagList, 'waiting fetch tag', repo);
    if (!tagList) return;
    const tags = tagList.map(item => item.name); // [ 'vue3.0-template', 'vue-template' ]
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'Please choose a tag to create project'
    })
    return tag;
  }
  async download (repo, tag) {
    const url = `hanson774612160/${repo}${tag ? '#' + tag : ''}`; // 下载地址
    await wrapLoading(this.downloadGitRepo, 'waiting download template', url, path.resolve(process.cwd(), this.targetDir))
  }
  async create () {
    // 1）获取模板名称
    const repo = await this.getRepo()
    const tag = await this.getTag(repo)
    await this.download(repo, tag)
    // 4）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm i\r\n')
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator