import { config } from "../config/config";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export const db :any = {};
db.mongoose = mongoose;
db.url = config.MONGO_DB_URL;
db.place = require("./place.model.ts")(mongoose);

module.exports = db;