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

const getMyPosts = async (authorId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: { id: authorId, status: "ACTIVE" },
    select: { id: true },
  });

  return await prisma.post.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { comments: true } },
    },
  });
};

const updatePost = async (
  postId: string,
  authorId: string,
  data: Partial<Post>,
  isAdmin: boolean
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: { id: true, authorId: true },
  });

  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error("Unauthorized");
  }

  if (!isAdmin) {
    delete data.isFeatured;
  }

  return await prisma.post.update({
    where: { id: postData.id },
    data,
  });
};

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean
) => {
  const postData = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: { id: true, authorId: true },
  });
  if (!isAdmin && postData.authorId !== authorId) {
    throw new Error("Unauthorized");
  }
  return await prisma.post.delete({
    where: { id: postData.id },
  });
};

const getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      featuredPosts,
      totalComments,
      approvedComments,
      rejectedComments,
      totalUsers,
      adminCount,
      userCount,
      totalViews,
    ] = await Promise.all([
      tx.post.count(),
      tx.post.count({ where: { status: PostStatus.PUBLISHED } }),
      tx.post.count({ where: { status: PostStatus.DRAFT } }),
      tx.post.count({ where: { status: PostStatus.ARCHIVED } }),
      tx.post.count({ where: { isFeatured: true } }),
      tx.comment.count(),
      tx.comment.count({ where: { status: CommentStatus.APPROVED } }),
      tx.comment.count({ where: { status: CommentStatus.REJECTED } }),
      tx.user.count(),
      tx.user.count({ where: { role: "ADMIN" } }),
      tx.user.count({ where: { role: "USER" } }),
      tx.post
        .aggregate({ _sum: { views: true } })
        .then((res) => res._sum.views || 0),
    ]);
    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      archivedPosts,
      featuredPosts,
      totalComments,
      approvedComments,
      rejectedComments,
      totalUsers,
      adminCount,
      userCount,
      totalViews,
    };
  });
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
