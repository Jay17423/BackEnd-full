

import dotenv from "dotenv" 
import connectDB from "./db/index.js"

 dotenv.config({ 
  path : './env'
 })

 connectDB()


 































 // This is the first approach to connect to the database 
/* ( async () =>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",(error) =>{
        console.log("ERROR: ",error);
        throw error
      })
      app.listen(process.env.PORT,() =>{
        console.log(`Listening on ${process.env.PORT}`);
      })
    }
  
    catch(error){
        console.log("ERROR: ",error);
        
    }
 } )()
  */