import mongoose from "mongoose";

const BubbleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    min: 3,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  path: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: String,
  children: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bubble",
  },
});

const Bubble =
  mongoose.models.Bubble ||
  mongoose.model("Bubble", BubbleSchema);

export default Bubble;
