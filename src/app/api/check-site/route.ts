import { requestAIs } from "@/services/aiRequestsService";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { chatGptResponse } = await requestAIs(data);

  return NextResponse.json({
    chatGptResponse,
  });
}

export async function GET() {
  try {
    const user = await currentUser();

    return NextResponse.json({
      message: user,
    });
  } catch {
    return NextResponse.json({
      message: "fail",
    });
  }
}
