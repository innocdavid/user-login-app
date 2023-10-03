import mongoose from "mongoose";
import colors from "colors";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`connected to mongodb: ${conn.connection.host}`.bgCyan);
  } catch (err) {
    console.error(`error: ${err.message}`.bgRed);
    process.exit(1);
  }
}

export default dbConnection;