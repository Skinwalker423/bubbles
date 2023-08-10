import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToMongoDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("mongo url not found");
  if (isConnected) return console.log("already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "bubbles",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
