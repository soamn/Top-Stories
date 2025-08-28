import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subcategoryId } = body;
  const id = Number(subcategoryId);
  try {
    const posts = await prisma.post.findMany({
      where: {
        subcategoryId: id,
        published: true,
      },
      select: {
        title: true,
        slug: true,
        thumbnail: true,
        description: true,
        createdAt: true,
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    if (posts.length < 1) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "No posts found",
      });
    }
    return NextResponse.json({
      success: true,
      status: 200,
      message: posts,
    });
  } catch (error) {}
}
