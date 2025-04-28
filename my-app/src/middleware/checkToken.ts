import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = "12345";

export async function checkToken(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if(token){
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            NextResponse.json(decoded);
            return NextResponse.next(); 
        } catch (error) {
            return new NextResponse("Немає доступу (", { status: 400 });
        }
    }
}