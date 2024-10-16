import { db } from "@/lib/db/init";

export const findUserWithGoogleId = async (googleId: string) => {
  return await db.user.findUnique({
    where: {
      googleId,
    },
  });
};

export const createUserWithGoogle = async (
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
