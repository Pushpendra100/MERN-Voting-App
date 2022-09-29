const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require("path");
const db = require('./models')
const handle = require("./handlers");
const routes = require("./routes");

const app = express();
const port = 4000;

const connectDatabase = require("./config/database")


if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config();
}

connectDatabase();

app.use(cors());
app.use(bodyParser.json())


app.use("/api/auth",routes.auth);
app.use("/api/polls", routes.poll)


app.use(express.static(path.join(__dirname,"../client/build")));

app.get("/",(req, res)=>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"));
});


app.use(handle.notFound);
app.use(handle.errors)


app.listen(process.env.PORT || port, console.log(`Server started on port ${port}`));