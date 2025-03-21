import connectDB from "@/db/database";
import { getRequestsHistory } from "@/services/getRequestsHistory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const userRequestHistory = await getRequestsHistory(
    Number(req.nextUrl.searchParams.get("page")),
    Number(req.nextUrl.searchParams.get("limit"))
  );
  return NextResponse.json(userRequestHistory);
}
