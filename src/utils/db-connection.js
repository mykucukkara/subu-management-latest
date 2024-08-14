import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongo:27017/subu_management";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  await mongoose.connect(MONGO_URI).then((mongoose) => {
    return mongoose;
  });
}

export default dbConnect;
