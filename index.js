const db = require('./db.js')


const inquirer = require('inquirer')


module.exports.add = async (taskName) => {
  // 读取之前的任务
  const list = await db.read()
  // 往里面添加任务
  list.push({title: taskName, done: false})
  // 存储任务
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}
function removeTask(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function editTask(list, index) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'value',
        message: '新名字:',
      }
    ])
    .then(answers2 => {
      list[index].title = answers2.value
      db.write(list)
    })
}

function createTask(list) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'value',
        message: '新任务:',
      }
    ])
    .then(answers3 => {
      list.push({title: answers3.value, done: false})
      db.write(list)
    })
}

function askForAction(list, index) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: '选择你需要的操作',
        choices: [
          {name: '标记已完成', value: 'markAsDone'},
          {name: '标记未完成', value: 'markAsUndone'},
          {name: '删除任务', value: 'removeTask'},
          {name: '修改任务名', value: 'editTask'},
          {name: '退出', value: 'quit'},
        ]
      }
    ])
    .then(answers => {
      const action = {markAsDone, markAsUndone, removeTask, editTask}
      action[answers.action] && action[answers.action](list, index)
    })
}

function printTaskList(list) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: '选择你想操作的任务',
        choices: [...list.map((task, index) => {
          return {name: `${task.done ? '[*]' : '[_]'}  ${index + 1} - ${task.title}`, value: index.toString()}
        }), {name: '+ 创建任务', value: '-2'}, {name: '退出', value: '-1'}]
      }
    ])
    .then(answers => {
      const index = parseInt(answers.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -2) {
        createTask(list)
      }
    })
}


module.exports.showAllTask = async () => {
  const list = await db.read()
  list && printTaskList(list)
}
