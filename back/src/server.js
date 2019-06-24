const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

mongoose.connect('mongodb+srv://Alex:aljr354250@clusteralex-w5qrd.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

app.use(cors())

app.use(express.json());

app.use(require('./routes'))

var port = 3333

app.listen(port)

console.log('listen on port: ' + port)