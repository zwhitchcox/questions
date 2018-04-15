import db from './db'

const express = require('express')
const path = require('path')

const app = express()

db({
  app,
  dir: __dirname + '/data',
})
app.use(express.static(path.resolve(__dirname, '../build/public')))
app.use(express.static(__dirname + '/static'))

app.listen(3000, () => console.log('Listening on 3000'))
