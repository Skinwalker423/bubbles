import mongoose, { ConnectOptions } from "mongoose";

const isConnected = false;

export const connectToMongoDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("mongo url not found");
  if (isConnected) return console.log("already connected");

  try {
    const client = mongoose.connect(
      process.env.MONGODB_URL,
      {
        dbName: "bubbles",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    return client;
  } catch (error) {
    console.log(error);
  }
};
