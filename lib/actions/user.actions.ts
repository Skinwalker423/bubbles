"use server";

import { connectToMongoDb } from "../mongoose";
import User from "../models/user.model";

export const updateUser = async (updatedUserData: {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  pathname: string;
}): Promise<void> => {
  connectToMongoDb();
  const { bio, image, name, pathname, userId, username } =
    updatedUserData;
  try {
    const newUser = await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        path: pathname,
        image,
      },
      {
        upsert: true,
      }
    );
  } catch (error: any) {
    throw new Error(
      `Failed to create/update user: ${error}`
    );
  }
};
