const express = require('express')
const boardControllers = require('../controllers/board')
const boardRouter = express.Router();


boardRouter.route('/').
  post(boardControllers.createBoard).
  get(boardControllers.getAllBoards)


boardRouter.route("/:id").
  get(boardControllers.fetchBoard).
  patch(boardControllers.updateBoard).
  delete(boardControllers.deleteBoard)


boardRouter.use('/:boardId/columns', require('./boardColumn'))
// boardRouter.use('/:boardId/items', require('./boardItems'))


module.exports = boardRouter
