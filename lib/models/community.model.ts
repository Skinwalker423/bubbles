import mongoose from "mongoose";

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
});

const Community =
  mongoose.models.Community ||
  mongoose.model("Community", CommunitySchema);

export default Community;
