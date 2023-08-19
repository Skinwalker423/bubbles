"use server";

import { connectToMongoDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Bubble from "../models/bubble.model";

interface UpdatedUserDataProps {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export const updateUser = async (
  updatedUserData: UpdatedUserDataProps
): Promise<void> => {
  connectToMongoDb();
  const { bio, image, name, path, userId, username } =
    updatedUserData;
  try {
    const newUser = await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        path,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user: ${error}`
    );
  }
};

export const fetchUser = async (id: string) => {
  try {
    await connectToMongoDb();
    return await User.findOne({
      id,
    }).populate({
      path: "communities",
      model: "Community",
    });
  } catch (error) {
    throw new Error("problem fetching user", error as any);
  }
};

export const fetchUserPosts = async (userId: string) => {
  try {
    await connectToMongoDb();
    //TODO: POPULATE COMMUNITY
    const posts = await User.findOne({
      id: userId,
    }).populate({
      path: "bubbles",
      model: Bubble,
      populate: [
        {
          path: "children",
          model: Bubble,
          populate: {
            path: "author",
            model: User,
            // select: "name image id",
          },
        },
        {
          path: "author",
          model: User,
          select: "name image id",
        },
      ],
    });

    return posts;
  } catch (err: any) {
    throw new Error(
      "problem fetching user posts",
      err.message
    );
  }
};
