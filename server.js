const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

const cors = require('cors');


app.use(cors({
    origin: '*'
}));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use the express-static middleware
app.use(express.static("public"))

// add router in the Express app.
app.use("/", router);

// define the first route
router.get("/", function (req, res) {
    res.send("<h1>Server is working well!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));