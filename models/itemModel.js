const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: Date,
	},
	board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
