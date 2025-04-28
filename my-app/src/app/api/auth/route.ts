import { users } from "@/data/userDB";
import { UserInt } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

import jwt from 'jsonwebtoken';

const JWT_SECRET = "12345";

let currentId = 1;

export async function POST(req: NextRequest){
    const body = await req.json();
    const {email, password} = body;

    console.log(users)
    const user = users.find(user => user.email === email);
    console.log(user)
    if (!user) {
        return NextResponse.json({ error: "Невірний email " }, { status: 400 });
    }

    const pasRes  = users.find(user => user.password === password);
    if (!pasRes) {
        return NextResponse.json({ error: "Невірний  пароль" }, { status: 400 });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },  
        JWT_SECRET,                         
        { expiresIn: '5m' }                 
      );
    
      console.log(token)

    return NextResponse.json(token, {status: 200});
}