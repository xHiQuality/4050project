const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models");
const { USER } = require("./config/db.config");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//simple route
// app.get("/", (req,res) => {
//     res.json({ message: "Welcome to application."});
// });

// set port, listen for requests
const PORT = process.env.PORT || 3001;

require("./routes/user.routes")(app);
require("./routes/post.routes")(app);
require("./routes/comment.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});





