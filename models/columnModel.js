const mongoose = require('mongoose')

const columnSchema = mongoose.Schema(
	{
		name: { type: String },
		board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
		items: [
			{
				item: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Item", // Reference to the item
					required: false,
				},
				position: {
					type: Number,
					required: function() {
          	return this.item !== undefined;
        	}
				},
			},
		],
	},
	{ timestamps: true }
);
const Column = mongoose.model("column", columnSchema);
module.exports =  Column