"use server";

import { connectToMongoDb } from "../mongoose";
import Bubble from "../models/bubble.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface BubbleProps {
  text: string;
  communityId: string | null;
  author: string;
  path: string;
}

export const createBubble = async (
  bubbleData: BubbleProps
) => {
  const { author, communityId, path, text } = bubbleData;

  try {
    await connectToMongoDb();

    const createdBubble = await Bubble.create({
      text,
      community: null,
      author,
      path,
    });

    const updateUser = await User.findByIdAndUpdate(
      author,
      {
        $push: {
          bubbles: createdBubble._id,
        },
      }
    );

    revalidatePath(path);
  } catch (error) {
    throw new Error(
      "problem creating bubble",
      error as any
    );
  }
};
