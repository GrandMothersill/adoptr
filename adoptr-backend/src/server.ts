const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001
// const connection_url = `mongodb+srv://adoptrdb:${process.env.MONGO_ATLAS_PW}@cluster0.jt8pq.mongodb.net/${process.env.MONGO_ATLAS_UN}?retryWrites=true&w=majority`




// process.env.WHATEVER - put pass and username in env for more security
MongoClient.connect(
    "mongodb+srv://adoptrdb:adoptrdbpassword@cluster0.jt8pq.mongodb.net/adoptordb?retryWrites=true&w=majority", { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db("adoptrdb");
        const animalsCollection = db.collection("animals");
        const usersCollection = db.collection("users");
        const sheltersCollection = db.collection("shelters");
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.listen(port, function () {
            console.log("listening on 3001");
        });

        app.get("/", (req, res) => {
            res.status(200).send("hello not available NO uh");
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        app.get("/animals", (req, res) => {
            db.collection("animals").find().toArray()
                .then(results => {
                    // replace with html to send to front-end
                    res.send(results)
                })
                .catch(error => console.error(error))
        });

        app.post("/animals", (req, res) => {
            animalsCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/animals');
                })
                .catch(error => console.log(error));
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        app.get("/login", (req, res) => {
            console.log("QUERY", req.query)
            db.collection("users").find({ email: req.query.email, password: req.query.password }).toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        });

        app.get("/shelterlogin", (req, res) => {
            console.log("QUERY", req.query)
            db.collection("shelters").find({ email: req.query.email, password: req.query.password }).toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        app.get("/users", (req, res) => {
            db.collection("users").find().toArray()
                .then(results => {
                    res.send(results)
                    console.log("GET USERS CALLED")
                })
                .catch(error => console.error(error))
        });

        app.post("/users", (req, res) => {
            usersCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.log(error));
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        app.get("/shelters", (req, res) => {
            db.collection("shelters").find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        });

        app.post("/shelters", (req, res) => {
            sheltersCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/shelters');
                })
                .catch(error => console.log(error));
        });
    })
    .catch(error => console.error(error));




// npm run start:watch - to start server   