import { tasks } from "@/data/taskDB";
import { TasksInt } from "@/types/tasks";
import { NextRequest, NextResponse } from "next/server";

let currentId = 1;

//POST
export async function POST(req: NextRequest) {
    const body = await req.json();
    const {name, text} = body;

    if(!name || !text){
        return NextResponse.json({error: "Немає Імені та тексту!"}, {status: 400});
    }

    const newTasks: TasksInt = {
        id: currentId++,
        name,
        text,
        createdAt: new Date(),
        progres:"заплановано",
    };

    tasks.push(newTasks);
    return NextResponse.json(newTasks, {status: 200});
}

//GET
export async function GET() {
    return NextResponse.json(tasks);
}

//DELETE
export async function DELETE(req:NextRequest) {
    const {id}: {id: number} = await req.json();

    const index = tasks.findIndex((tasks)=>tasks.id === id);

    if(index === -1){
        return new NextResponse('Повідомлення не знайдено', { status: 404 });
    }

    tasks.splice(index, 1);
    return new NextResponse('Повідомлення видалено', { status: 200 });
}

