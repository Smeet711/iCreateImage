const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');



// Middleware(INBUILT);
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
dotenv.config();



mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('connected', () => {
    console.log("Mongoose connection done");
})
db.on("error", (err) => {
    console.log("Mongoose default connection fail: " + err);
});

app.get('/', (req, res) => {
    return res.send("<p>Card's Backend</p>")
});

const authRotuer = require("./routes/user");
const invitationRotuer = require("./routes/createCard");

app.use("/api", authRotuer);
app.use('/api', invitationRotuer);


const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server is running..", 4000);
});