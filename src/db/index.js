const body_parser = require('body-parser')
const fs = require('fs-extra')
const uuid = require('uuid/v4')

export default function attach({dir, app}) {
  let questions = {}
  get_data(dir)
    .then(data => questions = data)
  app.use(body_parser.json())
  app.post('/questions', (req, res) => {
    const id = uuid()
    questions[id] = req.body
    write_data(dir, questions)
      .then(() => res.end(id))
      .catch(() => res.status(500).end('Unable to write data - server error'))
  })
  app.get('/questions', (req, res) => {
    res.end(JSON.stringify(questions))
  })
}

export function get_data(dir) {
  return fs.readJson(dir + '/questions.json')
    .catch(err => {
      if (err.code ===  'ENOENT')
        fs.writeJson(dir + '/questions.json', {})
      return {}
    })
}

export function write_data(dir, data) {
  const path = dir + '/questions.json'
  return fs.ensureFile(path)
    .then(() => fs.writeJson(path, data))
}
