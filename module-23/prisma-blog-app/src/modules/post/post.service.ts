import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: { ...data, authorId: userId },
  });
  return result;
};

const getAllPosts = async ({
  search,
  tags,
}: {
  search?: string;
  tags?: string[];
}) => {
  const andConditions: PostWhereInput[] = [];
  if (search) {
    andConditions.push({
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ],
    });
  }
  if (tags && tags.length > 0) {
    andConditions.push({ tags: { hasEvery: tags } });
  }
  const posts = await prisma.post.findMany({
    ...(andConditions.length > 0 && { where: { AND: andConditions } }),
  });

  return posts;
};

export const postService = {
  createPost,
  getAllPosts,
};
