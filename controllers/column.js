const Column = require('../models/columnModel')
const Board = require("../models/boardModel");


const addColumn = async (req, res) => {
    try {
			const { boardId, name } = req.body;

			const board = await Board.findById(boardId);

			if (!board) {
				return res.status(404).json({ message: "Board not found" });
			}

			const column = new Column({ name, board: boardId });
			await column.save();

			res.status(201).json(column);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}

}

const deleteColumn = async (req, res) => {
  try {
		const boardId = req.params.boardId;
		const columnId = req.params.columnId;
		const board = await Board.findById(boardId);

		if (!board) {
			return res.status(404).json({ message: "Board not found" });
		}
		const column = await Column.findOne({ _id: columnId, board: boardId });

		if (!column) {
			return res.status(404).json({ message: "Column not found" });
		}

		await Column.deleteOne({ _id: columnId });

		res.status(200).json({message: "Column deleted successfully"}); 
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}

const updateColumn = async (req, res) => {
  try {
		const boardId = req.params.boardId;
		const columnId = req.params.columnId;
		const { name } = req.body;

		const board = await Board.findById(boardId);

		if (!board) {
			return res.status(404).json({ message: "Board not found" });
		}
		const column = await Column.findOne({ _id: columnId, board: boardId });

		if (!column) {
			return res.status(404).json({ message: "Column not found" });
		}

		column.name = name || column.name;
		await column.save();

		res.status(200).json(column);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = {addColumn, updateColumn, deleteColumn}