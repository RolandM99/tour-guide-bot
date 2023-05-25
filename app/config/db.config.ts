// module.exports = {
//     url: "mongodb+srv://rolandM:man1234@guide-tour.owg60cv.mongodb.net/guide_tour_db"
//   };
import { config } from "../config/config";

const db = require("../models");
export const connectDB = () => {
	 
	db.mongoose
	  .connect(config.MONGO_DB_URL , {
	    useNewUrlParser: true,
	    useUnifiedTopology: true
	  })
	  .then(() => {
	    console.log("Connected to the database!");
	  })
	  .catch((err: any) => {
	    console.log("Cannot connect to the database!", err);
	    process.exit();
	  });
}