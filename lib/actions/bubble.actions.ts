"use server";

import { connectToMongoDb } from "../mongoose";
import Bubble from "../models/bubble.model";

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
  await connectToMongoDb();

  const createdBubble = await new Bubble({
    text,
    communityId,
    author,
    path,
  });
};
