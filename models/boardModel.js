const mongoose = require('mongoose')
const Column = require('./columnModel')
const boardSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

boardSchema.post("save", async function(doc) {
	const columnNames = ["To Do", "In Progress", "Completed"];

	for (const columnName of columnNames) {
		await Column.create({ name: columnName, board: doc._id });
	}
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board