const express = require("express");

const app = express();
const port = process.env.PORT || 3001
const connection_url = `mongodb+srv://adoptrdb:${process.env.MONGO_ATLAS_PW}@cluster0.jt8pq.mongodb.net/${process.env.MONGO_ATLAS_UN}?retryWrites=true&w=majority`
// process.env.WHATEVER - put pass and username in env for more security


app.listen(port, function () {
    console.log("listening on 3001");
});

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.status(200).send("hello not available NO uh")
});



// npm run start:watch - to start server