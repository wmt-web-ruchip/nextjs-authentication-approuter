import mongoose from "mongoose";
const connection = { isConnected: 0 };
async function connect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("error ===>",error);
    process.exit(1);
  }
}
export {connect};