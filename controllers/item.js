const Item = require('../models/itemModel')
const Board = require("../models/boardModel")
const Column = require("../models/columnModel")

const addItem = async (req, res) => {
    try {
			const boardId = req.params.boardId;
			const { columnId, name, description, dueDate } = req.body;

			const board = await Board.findById(boardId);
			if (!board) {
				return res.status(404).json({ message: "Board not found" });
			}

			const column = await Column.findById(columnId);
			if (!column) {
				return res.status(404).json({ message: "Column not found" });
			}

			const newItem = new Item({ name, description, dueDate, board: boardId });
			await newItem.save();

			column.items.push({ item: newItem._id, position: column.items.length });
			await column.save();

			res.status(201).json(newItem);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
};

const updateItem = async (req, res) => {
  
};

const deleteItem = async (req, res) => {

  try {
		const boardId = req.params.boardId;
		const itemId = req.params.itemId;
		const { columnId, positions } = req.body;


		const board = await Board.findById(boardId);
		if (!board) {
			return res.status(404).json({ message: "Board not found" });
		}

		const column = await Column.findOne({ _id: columnId, board: boardId });
		if (!column) {
			return res.status(404).json({ message: "Column not found" });
		}

		const item = await Item.findById(itemId);
		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

	
		await Column.updateOne(
			{ _id: columnId },
			{ $pull: { items: { item: itemId } } }
		);

	
		await item.remove();

		const newPositionArray = positions.map((position, index) => {
			return { item: column.items[index].item, position };
		});

		column.items = newPositionArray;
		await column.save();

		res.status(204).json({message: "Item Deleted"});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { addItem, deleteItem, updateItem };
