import mongoose from "mongoose";
import User from "./user.model";

const CommunitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Community =
  mongoose.models.Community ||
  mongoose.model("Community", CommunitySchema);

export default Community;
