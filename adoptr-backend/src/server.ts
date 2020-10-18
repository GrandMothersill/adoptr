const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3001
// const connection_url = `mongodb+srv://adoptrdb:${process.env.MONGO_ATLAS_PW}@cluster0.jt8pq.mongodb.net/${process.env.MONGO_ATLAS_UN}?retryWrites=true&w=majority`
const ObjectId = require('mongodb').ObjectId

// process.env.WHATEVER - put pass and username in env for more security
MongoClient.connect(
    "mongodb+srv://adoptrdb:adoptrdbpassword@cluster0.jt8pq.mongodb.net/adoptordb?retryWrites=true&w=majority", { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db("adoptrdb");
        const animalsCollection = db.collection("animals");
        const usersCollection = db.collection("users");
        const sheltersCollection = db.collection("shelters");
        const matchesCollection = db.collection("matches");
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.listen(port, function () {
            console.log("listening on 3001");
        });

        app.get("/", (req, res) => {
            res.status(200).send("Adoptr Serer");
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

        app.get("/profile", (req, res) => {
            const idObject = new ObjectId(req.query.id);
            db.collection("animals").find({
                _id: idObject
            }).toArray()
                .then(results => {
                    res.send(results);
                })
                .catch(error => console.error(error))
        })

        app.post("/animals", (req, res) => {
            animalsCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/animals');
                })
                .catch(error => console.log(error));
        });

        app.get("/profiles", (req, res) => {
            // const idObject = new ObjectId(req.query.id);
            db.collection("animals").find({ shelterInfo: { shelter_name: req.query.name, shelter_id: req.query.id } }).toArray()
                .then(results => {
                    res.send(results);
                })
                .catch(error => console.error(error))
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        app.get("/login", (req, res) => {
            db.collection("users").find({ email: req.query.email }).toArray()
                .then(results => {
                    if (results[0]) {
                        const dbpassword = results[0].password
                        if (bcrypt.compareSync(req.query.password, dbpassword)) {
                            res.send(results[0]);
                        } else {
                            res.send(false);
                        }
                    } else {
                        res.send(false);
                    }
                })
                .catch(error => console.error(error))
        });

        app.get("/shelterlogin", (req, res) => {
            db.collection("shelters").find({ email: req.query.email }).toArray()
                .then(results => {
                    if (results[0]) {
                        const dbpassword = results[0].password
                        if (bcrypt.compareSync(req.query.password, dbpassword)) {
                            res.send(results[0]);
                        } else {
                            res.send(false);
                        }
                    }
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
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            usersCollection.insertOne({ ...req.body, password: hashedPassword })
                .then(result => {
                    res.send(result);
                    // res.redirect('/');
                })
                .catch(error => res.status(409).send(error));
        });

        app.put("/user", (req, res) => {
            usersCollection.updateOne(
                { _id: ObjectId(req.body.userID) },
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        user_photo: req.body.user_photo
                    }
                }
            )
                .then(result => {
                    res.send(result);
                })
                .catch(error => console.log(error));
        });

        app.put("/users/reject", (req, res) => {
            usersCollection.updateOne(
                { _id: ObjectId(req.body.userID) },
                {
                    $push: { rejected_animals: req.body.animalID },
                }
            )
                .then(result => {
                    res.send(result);
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
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            sheltersCollection.insertOne({ ...req.body, password: hashedPassword })
                .then(result => {
                    res.redirect('/shelters');
                })
                .catch(error => res.status(409).send(error));
        });


        app.put("/shelter", (req, res) => {
            console.log(req.body);
            sheltersCollection.updateOne(
                { _id: ObjectId(req.body.shelterID) },
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        bio: req.body.bio,
                        phone: req.body.phone,
                        address: {
                            street_number: req.body.address.street_number,
                            street: req.body.address.street,
                            city: req.body.address.city,
                            province: req.body.address.province,
                            postal_code: req.body.address.postal_code
                        },
                        location: req.body.location
                    }
                }
            )
                .then(result => {
                    res.send(result);
                })
                .catch(error => console.log(error));
        });



        ////////////////////////////////////////////////////////////////////////////////

        app.post("/matches", (req, res) => {
            matchesCollection.insertOne(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(error => console.log(error));
        });

        app.get("/matches/user", (req, res) => {
            db.collection("matches").find({ userID: req.query.userID }).toArray()
                .then(results => {
                    res.send(results);
                })
                .catch(error => console.error(error))
        });

    })
    .catch(error => console.error(error));



// npm run start:watch - to start server   