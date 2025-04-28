import { users } from "@/data/userDB";
import { UserInt } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

let currentId = 1;

export async function POST(req: NextRequest){
    const body = await req.json();
    const {email, password} = body;

    const existUser = users.find(user => user.email === email);
    if (existUser) {
        return NextResponse.json({ error: "Користувач з таким іменем вже існує" }, { status: 400 });
    }
    const newUser: UserInt = {
        id: currentId++,
        email,
        password
    };
    console.log(newUser)
    users.push(newUser)
    console.log(users)
    return NextResponse.json(newUser, {status: 200});
}