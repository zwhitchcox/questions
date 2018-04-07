import express from 'express'

const app = express()

app.get('/', (req, res) => res.end('Hello, world'))

app.listen(3000, () => console.log('Listening on 3000'))

