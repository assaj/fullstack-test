const express = require('express')
const Controller = require('./controllers/Controller')
const routes = new express.Router()

routes.get('/cellphones', Controller.index)
routes.post('/add', Controller.store)
routes.post('/update',Controller.update)
routes.delete('/remove', Controller.remove)

module.exports = routes;