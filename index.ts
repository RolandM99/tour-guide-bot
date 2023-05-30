import { connectDB } from "./app/config/db.config"
import { tgWrapper } from "./telegram/tg_bot";
const express = require("express");
const cors = require("cors");

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

connectDB();

// call the telegram bot
try {
  console.log(`Tour Guide Started... \n 🕒 Time: ${new Date()}`);
  tgWrapper();
} catch (error) {
  console.log("Error", error);
}

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req: any, res: any ) => {
  res.json({ message: "Welcome to the guide-tour application." });
});

require("./app/routes/place.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});