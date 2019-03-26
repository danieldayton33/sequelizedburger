//dependencies
const express = require("express");

//set up express app
const app = express();
const PORT = process.env.PORT || 8080;

//bring in models
const db = require("./models");

// Static directory
app.use(express.static("public"));

//setup express parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//import routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

//sync db then beginning listening to port
db.sequelize.sync().then( ()=>{
    app.listen(PORT, ()=>{
        console.log("Listening on http://localhost:" + PORT);
    });
});
