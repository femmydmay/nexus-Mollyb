import { cache } from "react";
import prisma from "./database";

export const revalidate = 3600; // revalidate the data at most every hour

export const getUser= cache(async (id: string) => {
  const user = await prisma.user.findUnique({ where:{id}, select:{role:true, firstname: true, lastname:true} });
  return user;
});
