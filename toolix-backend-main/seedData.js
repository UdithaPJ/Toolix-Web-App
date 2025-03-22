const mongoose = require("mongoose");

const connection = require("./config/database");

mongoose.connection = connection;

const ToolSchema = require("./src/models/tool");

const UserSchema = require("./src/models/user");

const UserJson = require("./sample_data/user.json");

const toolJson = require("./sample_data/tool.json");

// Import Sample Data In DB
const importData = async () => {
  try {
    await UserSchema.create(UserJson);
    await ToolSchema.create(toolJson);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await UserSchema.deleteMany();
    await ToolSchema.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData().then();
} else if (process.argv[2] === "-d") {
  deleteData().then();
}
