import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const instance = await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`)
        console.log(`Mongo connected to DB host ${instance.connection.host}`)
    } catch (error) {
        console.log("mongo connection failed", error);
        process.exit(1);
    }
};

export default connectDB;