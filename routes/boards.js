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


module.exports = boardRouter

  

// boardRouter.use('/:id/columns', require('./boardColumn'))
// boardRouter.use('/:id/items', require('./boardItems'))