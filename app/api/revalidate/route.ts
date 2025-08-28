import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ status: 401 });
    }
    const body = await req.json();
    const { tag } = body;
    revalidateTag(tag);
    return NextResponse.json({ status: 200 });
  } catch (error) {}
}
