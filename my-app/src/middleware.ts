import { checkToken } from "@/middleware/checkToken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.url.includes("/api/tasks")) {
    return checkToken(req);  
  }
  if (req.url.includes("/api/task")) {
    return checkToken(req);  
  }
  return NextResponse.next();
}