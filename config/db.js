const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
	try {
		console.log('check=======', process.env.MONGO_URI);
		const connection = await mongoose.connect(process.env.MONGO_URI, {

		});
		console.log(
			`MongoDB Connected: ${connection.connection.host}`.cyan.underline
		);
	} catch (e) {
		console.log(`Error: ${e.message}`.red.bold);
	}
};

module.exports = { connectDB };
