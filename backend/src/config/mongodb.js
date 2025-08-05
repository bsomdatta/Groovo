import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connection established");

    })
    await mongoose.connect(`${process.env.MONGODB_URI}/groovo`)
}

export default connectDB;



