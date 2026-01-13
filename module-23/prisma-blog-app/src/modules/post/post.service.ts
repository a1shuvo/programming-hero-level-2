import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { CommentStatus, PostStatus } from "./../../../generated/prisma/enums";

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
  isFeatured,
  status,
  authorId,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  search?: string;
  tags?: string[];
  isFeatured?: boolean | undefined;
  status?: PostStatus;
  authorId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
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

  if (typeof isFeatured === "boolean") {
    andConditions.push({ isFeatured });
  }

  if (status) {
    andConditions.push({ status });
  }

  if (authorId) {
    andConditions.push({ authorId });
  }

  const posts = await prisma.post.findMany({
    take: limit ?? 10,
    skip: page && limit ? (page - 1) * limit : 0,
    ...(andConditions.length > 0 && { where: { AND: andConditions } }),
    orderBy: {
      [sortBy || "createdAt"]: sortOrder || "desc",
    },
    include: {
      _count: { select: { comments: true } },
    },
  });

  const total = await prisma.post.count({
    ...(andConditions.length > 0 && { where: { AND: andConditions } }),
  });

  return {
    data: posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / (limit || 10)),
    },
  };
};

const getPostById = async (postId: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    const post = await tx.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          where: { parentId: null, status: CommentStatus.APPROVED },
          orderBy: { createdAt: "desc" },
          include: {
            replies: {
              where: { status: CommentStatus.APPROVED },
              orderBy: { createdAt: "asc" },
              include: {
                replies: {
                  where: { status: CommentStatus.APPROVED },
                  orderBy: { createdAt: "asc" },
                },
              },
            },
          },
        },
        _count: { select: { comments: true } },
      },
    });
    return post;
  });
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
};
