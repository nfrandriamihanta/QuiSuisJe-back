const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

const cors = require('cors');

const user = require("./user/user")
const lesson = require("./lesson/lesson")


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
    res.send("<h1>Your server is still working well!</h1>")
})

router.post("/connexion", async function (req, res) {
    let result = {}
    try {
        result = await user.signIn(req.body)
        console.log(result)
        if (result) res.status(200).json({
            "message": "Authentification réussie",
            "status": 200,
            "res": result
        })
        else res.status(200).json({
            "message": "Authentification échouée",
            "status": 400,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": "Authentification échouée",
            "status": 400
        })
    }
})

router.get("/testWs", async function (req, res) {
    res.status(200).json({
        "message": "test réussi",
        "status": "200"
    })
})

router.get("/themes", async function (req, res) {
    let result = {}
    try {
        result = await lesson.findAllTopics()
        console.log(result)
        if (result) res.status(200).json({
            "status": 200,
            "res": result
        })
        else res.status(200).json({
            "message": "Aucune donnée",
            "status": 400,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": "Un problème est survenu lors de l'opération",
            "status": 400
        })
    }
})

router.post("/suggestion", async function (req, res) {
    let result = {}
    try {
        result = await user.suggestTopic(req.body)
        console.log(result)
        if (result.modifiedCount >= 1) res.status(200).json({
            "status": 200,
            "message": "Suggestion envoyée à l'administrateur"
        })
        else res.status(200).json({
            "message": "Echec de l'envoi de la suggestion",
            "status": 400,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": "Un problème est survenu lors de l'opération",
            "status": 400
        })
    }
})


// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));