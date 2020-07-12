const db = require("../db.js")
const fs = require('fs')
jest.mock('fs');

describe('db',  () => {
  afterEach(() => {
    fs.clearMocks()
  })
  it('can read', async() => {
    expect(db.read instanceof Function).toBeTruthy()
    const data = [{title: 'a', done: true}]
    fs.setReadMock('/test', null, JSON.stringify(data))
    const list = await db.read('/test')
    expect(list).toStrictEqual(data)
  })
  it('can write', () => {
    expect(db.write instanceof Function).toBeTruthy()
    let file = ''
    fs.setWriteMock('/test', (path, data, callback) => {
      file = data
      callback(null)
    })
    const list = [{title: 'a', done: true}]
    db.write(list, '/test')
    expect(file).toEqual(JSON.stringify(list))
  })
})
