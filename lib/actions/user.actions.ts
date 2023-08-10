"use server";

import { connectToMongoDb } from "../mongoose";

export const updateUser = async (): Promise<void> => {
  connectToMongoDb();
};
