"use server";

import { connectToMongoDb } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Bubble from "../models/bubble.model";
import Community from "../models/community.model";
import { FilterQuery, SortOrder } from "mongoose";
import { currentUser } from "@clerk/nextjs";

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
      model: Community,
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
        {
          path: "community",
          model: Community,
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

export const likeBubble = async (
  userId: string,
  bubbleId: string,
  path: string
) => {
  try {
    const user = await User.findOne({
      id: userId,
    });

    if (!user) return null;

    await user.likes.push(bubbleId);
    await user.save();
    revalidatePath(path);
  } catch (error) {
    throw new Error(`problem liking bubble: ${error}`);
  }
};

export const unLikeBubble = async (
  userId: string,
  bubbleId: string,
  path: string
) => {
  try {
    const user = await User.findOne({
      id: userId,
    });

    if (!user) return null;

    await user.likes.pull(bubbleId);
    await user.save();
    revalidatePath(path);
  } catch (error) {
    throw new Error(`problem unliking bubble: ${error}`);
  }
};

export const fetchUsers = async ({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) => {
  try {
    await connectToMongoDb();
    const skip = (pageNumber - 1) * pageSize;

    const regExp = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regExp } },
        { name: { $regex: regExp } },
      ];
    }

    const sortOptions = {
      createdAt: sortBy,
    };

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .exec();

    const totalUsersCount = await User.countDocuments(
      query
    );

    const isNext = totalUsersCount > skip + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getActivity = async (userId: string) => {
  try {
    await connectToMongoDb();

    const userBubbles = await Bubble.find({
      author: userId,
    });
    console.log("bubbles", userBubbles);

    let bubbleReplyIds: string[] = [];

    userBubbles.forEach((bubble) => {
      bubbleReplyIds = [
        ...bubbleReplyIds,
        ...bubble.children,
      ];
    });

    const replies = await Bubble.find({
      _id: { $in: bubbleReplyIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    if (!replies) return;

    console.log("bubble replies", replies);
    return replies;
  } catch (error: any) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
};

export const fetchCurrentUserAndUserProfile = async (
  id?: string
) => {
  connectToMongoDb();
  const user = await currentUser();

  const userProfile = await User.findOne({
    id: user?.id,
  })
    .populate({
      path: "bubbles",
      model: "Bubble",
      populate: [
        {
          path: "author",
          model: "User",
        },
      ],
    })
    .populate({
      path: "likes",
      model: Bubble,
    });

  const profile = await User.findOne({
    id: id,
  }).populate({
    path: "bubbles",
    model: "Bubble",
    populate: {
      path: "author",
      model: "User",
    },
  });

  return { user, userProfile, profile };
};
