import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { get } from 'node:http';

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: { ...data, authorId: userId },
  });
  return result;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const postService = {
  createPost,
  getAllPosts,
};
