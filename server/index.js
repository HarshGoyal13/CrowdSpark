const express = require("express");
const app = express();
require("dotenv").config()
const cors = require('cors')

const mailRoute = require("./routes/ContactUs")
const userRoute = require("./routes/MileStoneAchive")

app.use(cors());
app.use(express.json());

app.use("/api/v1", mailRoute);
app.use("/api/v2", userRoute);



const connectDb = require("./config/Database")


app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log(`Server Connected At PORT - ${process.env.PORT}`);
})