import { Email } from "@clerk/nextjs/server";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  bubbles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bubble",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;
