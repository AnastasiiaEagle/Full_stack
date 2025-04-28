import { checkToken } from "@/middleware/checkToken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url.includes("/api/messages")) {
    return checkToken(req);  
  }
  
  return NextResponse.next();
}