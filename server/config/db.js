const {connect}=require("mongoose")
require("dotenv").config()

const dbConnect= async()=>{
    try {
        await connect(process.env.DB_URL)
        console.log("database is connected");
        
    } catch (error) {
        console.log("database not connected!");
        
    }
} 

module.exports=dbConnect