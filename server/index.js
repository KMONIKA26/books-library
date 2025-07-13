const express=require('express')
const dbConnect = require('./config/db')
const app=express()

require("dotenv").config()

app.use(express.json())


app.get("/", (req, res)=>{
    return res.status(200).send("Wellcome my server")
})

const PORT= process.env.PORT || 5000

app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is running on ${PORT}`);
})

