import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI as string;

if (!DATABASE_URL) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

//@ts-expect-error 
let cached = global.mongoose;

if (!cached) {
  //@ts-expect-error 
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;