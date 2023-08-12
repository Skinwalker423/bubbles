import mongoose from "mongoose";

const BubbleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Bubble =
  mongoose.models.Bubble ||
  mongoose.model("Bubble", BubbleSchema);

export default Bubble;
