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

export const fetchBubbles = async (
  pageNumber = 1,
  pageSize = 20
) => {
  try {
    await connectToMongoDb();

    const skip = pageSize * (pageNumber - 1);

    const bubbles = Bubble.find({
      parentId: {
        $in: [null, undefined],
      },
    })
      .sort({
        createdAt: "desc",
      })
      .skip(skip)
      .limit(pageSize)

      .populate({
        path: "author",
        model: "User",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image",
        },
      });
    console.log(bubbles);

    const totalPostCount = await Bubble.countDocuments({
      parentId: {
        $in: [null, undefined],
      },
    });

    const posts = await bubbles.exec();

    const isNext = totalPostCount > posts.length + skip;

    return { posts, isNext };
  } catch (error) {
    throw new Error(
      "problem fetching bubbles",
      error as any
    );
  }
};

export const fetchBubbleById = async (id: string) => {
  try {
    await connectToMongoDb();

    const bubbles = await Bubble.findOne({
      _id: id,
    })
      .populate({
        path: "author",
        model: "User",
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: "User",
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: "Bubble",
            populate: {
              path: "author",
              model: "User",
              select: "_id name parentId image",
            },
          },
        ],
      })
      .exec();

    return bubbles;
  } catch (error: any) {
    throw new Error(
      "problem fetching bubbles",
      error.message
    );
  }
};

export const addCommentToBubble = async (
  bubbleId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  try {
    await connectToMongoDb();
    const parentBubble = await Bubble.findById(bubbleId);
    if (!parentBubble) throw new Error("Bubble not found");
    const newComment = new Bubble({
      text: commentText,
      community: null,
      path,
      author: userId,
      parentId: bubbleId,
    });
    const savedComment = await newComment.save();
    parentBubble.children.push(savedComment._id);
    await parentBubble.save(path);

    revalidatePath("");
  } catch (error: any) {
    throw new Error("error adding comment", error.message);
  }
};
