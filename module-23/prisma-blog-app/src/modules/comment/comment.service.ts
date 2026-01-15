import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  await prisma.post.findUniqueOrThrow({
    where: { id: payload.postId },
  });

  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: { id: payload.parentId },
    });
  }

  return await prisma.comment.create({
    data: payload,
  });
};

const getCommentById = async (id: string) => {
  return await prisma.comment.findUnique({
    where: { id },
    include: {
      post: { select: { id: true, title: true, views: true } },
    },
  });
};

const getCommentsByAuthor = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
    include: {
      post: { select: { id: true, title: true } },
    },
  });
};

const deleteComment = async (id: string, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: { id, authorId },
    select: { id: true },
  });

  if (!commentData) {
    throw new Error("Comment not found or unauthorized");
  }

  return await prisma.comment.delete({
    where: { id: commentData.id },
  });
};

const updateComment = async (
  id: string,
  authorId: string,
  data: { content?: string; status?: CommentStatus }
) => {
  const commentData = await prisma.comment.findFirst({
    where: { id, authorId },
    select: { id: true },
  });

  if (!commentData) {
    throw new Error("Comment not found or unauthorized");
  }

  return await prisma.comment.update({
    where: { id: commentData.id },
    data,
  });
};

const moderateComment = async (id: string, data: { status: CommentStatus }) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id },
    select: { id: true, status: true },
  });

  if (comment.status === data.status) {
    throw new Error(`Comment is already ${data.status}`);
  }

  return prisma.comment.update({
    where: { id },
    data,
  });
};

export const commentService = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComment,
};
