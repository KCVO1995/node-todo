const home = process.env.HOME || require('os').homedir();
const fs = require('fs')
const p = require('path')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path,{flag: 'a+'}, (error, data) => {
        let list
        if (error) return reject(error)
        try {
          list = JSON.parse(data.toString())
        } catch {
          list = []
        }
        resolve(list)
      });
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(list), (error) => {
        if (error) return reject(error);
        resolve(true)
      });
    })
  }
}

module.exports = db
