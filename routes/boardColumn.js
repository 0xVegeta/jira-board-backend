const express = require('express')
const columnsRouter = express.Router()
const {addColumn, deleteColumn, updateColumn} = require('../controllers/column')


columnsRouter.post('/', addColumn)

columnsRouter.route('/:columnId').delete(deleteColumn).patch(updateColumn)


module.exports = columnsRouter
