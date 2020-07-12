#!/usr/bin/env node

const { program } = require('commander');
const api = require('./index.js')
const pkg = require('./package')


program
  .version(pkg.version)

program
  .command('add')
  .description('新增一个任务')
  .action((...args) => {
    const works = args[1] && args[1].join(' ')
    api.add(works).then(() => console.log('创建任务成功'), () => console.log('创建失败'))
  });
program
  .command('clear')
  .description('清空任务')
  .action(() => {
    api.clear().then(() => console.log('成功清空任务列表'), () => console.log('清空失败'))
  });
program
  .command('todo')
  .description('展示任务')
  .action(() => {
    void api.showAllTask()
  });


/*if (process.argv.length === 2) {
  console.log('用户直接运行 node cli 未传参数')
}*/


program.parse(process.argv);




