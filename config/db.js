const mongoose = require("mongoose");
const connectToDatabase = async () => {
  await mongoose.connect(process.env.db_connection_string);
};

module.exports = connectToDatabase;
