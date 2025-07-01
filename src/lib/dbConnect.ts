import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to db");
    return;
  }
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}` || "",
      {}
    );

    // console.log("db object: ", db);

    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("db connection failed, ", error);
    process.exit(1);
  }
}

export default dbConnect;
