const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora');

const message = 'Loading unicorns'

// 执行脚本
const spawn = require('cross-spawn');
// 定义需要按照的依赖
const dependencies = ['vue'];

// Spawn NPM asynchronously
// 执行安装
// const child = spawn('npm', ['install', '-D'].concat(dependencies), {
//   stdio: 'inherit'
// });

// // 监听执行结果
// child.on('close', function (code) {
//   // 执行失败
//   if (code !== 0) {
//     console.log(chalk.red('Error occurred while installing dependencies!'));
//     process.exit(1);
//   }
//   // 执行成功
//   else {
//     console.log(chalk.cyan('Install finished'))
//   }
// })

// 初始化
const spinner = ora(message);

program
  // 输入hanson-cli -V
  .version('0.1.0')
  // <arg>变量arg为输入的值，可以在下面action里取到
  .command('create <name>')
  .description('create a new project')
  .action(name => {
    // 开始加载动画
    spinner.start()
    spinner.color = 'red';
    spinner.spinner = 'mindblown';
    spinner.text = 'Loading mindblown';
    setTimeout(() => {
      spinner.stop() // 停止
      spinner.succeed('Loading succeed'); // 成功 ✔
      // 打印命令行输入的值

      // 文本样式
      console.log("project name is " + chalk.bold(name))

      // 颜色
      console.log("project name is " + chalk.cyan(name))
      console.log("project name is " + chalk.green(name))

      // 背景色
      console.log("project name is " + chalk.bgRed(name))

      // 使用RGB颜色输出
      console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
      console.log("project name is " + chalk.hex('#049CDB').bold(name));
      console.log("project name is " + chalk.bgHex('#049CDB').bold(name))
    }, 5000);
  })

program.parse()

// inquirer.prompt([
//   {
//     type: 'input',
//     name: 'name',
//     message: 'your name',
//     default: 'h-cli'
//   }
// ]).then(answers => {
//   // 模版文件目录
//   const destUrl = path.join(__dirname, 'template')
//   // 生成文件目录
//   // process.cwd() 对应控制台所在目录
//   const cwdUrl = process.cwd();
//   fs.readdir(destUrl, (err, files) => {
//     if (err) throw err
//     files.forEach(file => {
//       // 使用 ejs 渲染对应的模版文件
//       // renderFile（模版文件地址，传入渲染数据）
//       ejs.renderFile(path.join(destUrl, file), answers).then(data => {
//         // 生成 ejs 处理后的模版文件
//         fs.writeFileSync(path.join(cwdUrl, file), data)
//       })
//     })
//   })
// })