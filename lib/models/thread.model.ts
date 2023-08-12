import mongoose from "mongoose";

const BubbleSchema = new mongoose.Schema({
  bubble: {
    type: String,
    required: true,
    min: 3,
  },
  accountId: {
    type: String,
    required: true,
  },
});

const Bubble =
  mongoose.models.Bubble ||
  mongoose.model("Bubble", BubbleSchema);

export default Bubble;
