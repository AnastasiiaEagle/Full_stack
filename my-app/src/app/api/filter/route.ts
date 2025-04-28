import { tasks } from "@/data/taskDB";
import { TasksInt } from "@/types/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {progres}=await req.json();

    if(!progres){
        return NextResponse.json({error: 'Потрібен статус завдання'}, {status: 400});
    }
    console.log(progres)
    let result: TasksInt[] = [];
    tasks.forEach(task => {
        console.log(task.progres+ "===" +progres);

        if (task.progres === progres) {
            result.push(task);
        }
    });
    console.log(result)

    if (result.length === 0) {
        return NextResponse.json({ message: 'Завдання з таким статусом не знайдено', tasks: [] }, { status: 200 });
    }
    return NextResponse.json(result, { status: 200 });
}