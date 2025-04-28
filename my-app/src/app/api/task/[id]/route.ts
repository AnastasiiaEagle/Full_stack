import { tasks } from "@/data/taskDB";
import { TasksInt } from "@/types/tasks";
import { NextRequest, NextResponse } from "next/server";

//GET
export async function GET(req:NextRequest, {params}:{params: {id:string}}) {
    try {
        console.log(params.id)
        console.log(tasks)
        const id = Number(params.id);
        if (isNaN(id)) {
            return new NextResponse('Невірний ID', { status: 400 });
        }

        const result = tasks.find((m)=>m.id === id)

        if(!result){
            return new NextResponse('Не знайдено...', {status: 404});
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('Помилка:', error);
        return new NextResponse('Виникла помилка при обробці запиту', { status: 500 });
    }
}

//PUT
export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const id = Number(params.id);
    const body = await req.json();
    
    const result = tasks.find((m)=>m.id === id);

    if(!result){
        return new NextResponse('Не знайдено', {status:404});
    }

    result.name = body.name;
    result.text = body.text;
    result.progres = body.progres;

    return NextResponse.json(result);
}