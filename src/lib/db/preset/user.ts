import { db } from "@/lib/db/init";

export const findUserWithGoogleId = async (googleId: string) => {
  return await db.user.findUnique({
    where: {
      googleId,
    },
  });
};

export const createUserWithGoogleId = async (
  googleId: string,
  email: string,
  name: string,
  image: string,
) => {
  return await db.user.create({
    data: {
      googleId,
      email,
      name,
      image,
    },
  });
};

export const findUserWithId = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * BE CAREFUL PASSING THIS TO THE CLIENT, STRIP SENSITIVE DATA FIRST
 */
export const findAllUsers = async () => {
  return await db.user.findMany();
};
