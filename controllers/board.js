const Board = require('../models/boardModel')
const Column = require('../models/columnModel')
const mongoose = require('mongoose')

const createBoard = async (req, res) => {
  const { name, description } = req.body
  const board = new Board({ name, description })
  await board.save()

  return res.status(201).json(board)
}

const getAllBoards = async(req, res) =>{
  const allBoards = await Board.find()
  return res.status(200).json({allBoards})

}

const updateBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const { name, description } = req.body;
    console.log('check',typeof boardId);

    if (!boardId) {
      return res.status(400).json({ error: 'Invalid board ID' });
    }

    const board = await Board.findByIdAndUpdate(
      boardId,
      { name, description },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    return res.status(200).json({ board });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating the board' });
  }
}


const deleteBoard = async (req, res) => {
  try {
		const boardId = req.params.id;

		// Check if the provided ID is valid (you can add more validation here)
		if (!boardId) {
			return res.status(400).json({ error: "Invalid board ID" });
		}

    await Column.deleteMany({ board: Number(boardId) });
		const deletedBoard = await Board.findByIdAndDelete(boardId);

		if (!deletedBoard) {
			return res.status(404).json({ error: "Board not found" });
		}

		return res.status(200).json({ message: "Board deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error deleting the board" });
	}
}

const fetchBoard = async (req, res) => {
	try {
		const boardId = req.params.id;

		console.log("check", typeof boardId);
     const board = await Board.find({_id: boardId});
		if (!boardId) {
			return res.status(404).json({ error: "Invalid board ID" });
		}

		return res.status(200).json({ board });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Error updating the board" });
	}
};




module.exports = {
	createBoard,
	getAllBoards,
	updateBoard,
	deleteBoard,
	fetchBoard,
};

