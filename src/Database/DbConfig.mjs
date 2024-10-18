import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`MongoDB Connected at host ${connection.connection.host}`);
  } catch (error) {
    console.log("Mongoose Connection failed ☹");
    process.exit(1);
  }
};

export default connectDB;
