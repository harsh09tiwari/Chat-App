import moongose from "mongoose"


const connectDB = async () => {
   try {
    const connect = await moongose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected ${connect.connection.host}`);
    
   } catch (error) {
    console.log("MongoDB connection Error", error);
   }
}

export  {connectDB};