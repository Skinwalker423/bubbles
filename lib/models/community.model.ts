import mongoose from "mongoose";
import User from "./user.model";
import Bubble from "./bubble.model";

const CommunitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  bio: String,
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  bubbles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Bubble,
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
});

const Community =
  mongoose.models.Community ||
  mongoose.model("Community", CommunitySchema);

export default Community;
