var express = require("express");
var app = express();
app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server Started");
});

var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const mysql = require("mongodb").MongoClient;
var db;
const conn = MongoClient.connect("mongodb://localhost:27017",{ useUnifiedTopology: true },(err, client) => {
        if (err) throw err;
        console.log("Database Connected!");
        db = client.db("TempDB");
    }
);

app.post("/insert", (req, res) => {
    let data = {
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary,
    };
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.insertMany(data);
        console.log("Inserted!");
        res.send("Inserted!");
    });
});

app.get("/display", (req, res) => {
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.find().toArray((err, result) => {
            if (err) throw err;
            console.log("Displaying!");
            console.log(result);
            res.send(result);
        });
    });
});

