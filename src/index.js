const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora');
const figlet = require('figlet');
const message = 'Loading unicorns'

const create = require('./lib/create');

// 执行脚本
const spawn = require('cross-spawn');

program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    create(name, options)
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

program
  // 监听 --help 执行
  .on('--help', () => {
    console.log('\r\n' + figlet.textSync('hanson', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`hanson-cli <command> --help`)} for detailed usage of given command\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv);

