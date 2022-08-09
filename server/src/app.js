const express=require("express");
const cors=require("cors");
const  route  = require("./routes/router");
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//static location
app.use("/api",route);

module.exports=app;