import mongoose from 'mongoose';

export async function connect(){
    try {
        //connecting to the database
        mongoose.connect(process.env.MONGO_URI!) ;
        const connection =  mongoose.connection;
        connection.on("connected", ()=>{
            console.log("✅ Database Connected")
        })
        
        connection.on('error',(err)=>{
            console.log("MongoDb connection error. Please make sure MongoDb is running. " + err)
            process.exit();
        })

    } catch (error) {
       console.log("database connection error") 
       console.log("------------------------------")
       console.log(error)
    }
}