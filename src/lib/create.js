const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options)
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name) // 当前目录加上/name
  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      if (!action) return
      console.log(`\r\nRemoving...`)
      await fs.remove(targetAir)
    }
  }
}