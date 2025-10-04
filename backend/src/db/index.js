import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("db connected at teh instance",connect.connection.host)
    } catch (error) {
        console.error("Error connectiong the db");
        process.exit(1);
        
    }
}

export default connectDb