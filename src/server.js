const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, '../build/public')))
app.use(express.static(__dirname + '/static'))
console.log(__dirname)

app.listen(3000, () => console.log('Listening on 3000'))

