const body_parser = require('body-parser')
const fs = require('fs-extra')
const uuid = require('uuid/v4')
const store = {}

export default function attach({dir, app}) {
  app.use(body_parser.json())
  app.param(['field', 'id'], (req, res, next, field, id) => {
    req.field = field
    next()
  })
  app.post('/db/:field', (req, res) => {
    const id = uuid()
    const { field } = req
    store[field][id] = req.body
    write_data(dir, field)
      .then(() => res.end(id))
      .catch(() => res.status(500).end('Unable to write data - server error'))
  })
  app.get('/db/:field', (req, res) => {
    const { field } = req
    get_data(dir, field)
      .then(data => res.end(JSON.stringify(store[field] = data)))
      .catch(console.error)
  })
  app.delete('/db/:field/:id', (req, res) => {
    const { field, id } = req
    if (questions[req.params.id]) delete questions[req.params.id]
  })
  app.put('/db/:field', (req, res) => {
    const { field, id } = req
    questions[req.body.id] = req.body.data
  })
}

export function get_data(dir, field) {
  const path = dir + '/' + field + '.json'
  return fs.readJson(path)
    .catch(err => {
      if (err.code ===  'ENOENT')
        fs.writeJson(path, {})
      return {}
    })
}

export function write_data(dir, field) {
  const path = dir + '/' + field + '.json'
  return fs.ensureFile(path)
    .then(() => fs.writeJson(path, store[field]))
}
