import { TasksInt } from "@/types/tasks";
import { useState } from "react";
import Link from 'next/link';


type TaskProps = {
    id: number;
    name: string;
    text: string;
    createdAt: Date;
    progres: string;
    onDelete: (id: number) => void;
}

export default function TaskCard ({id, name, text, createdAt, progres, onDelete }:TaskProps){
    
    return(
        <li key={id} className="border p-4 rounded relative bg-white shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{name}</p>
                  <p>{text}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Створено: {new Date(createdAt).toLocaleString()}
                  </p>
                </div>
                    <p className="text-sm text-gray-500 mt-2">
                    Статус: {progres}
                    </p>
                <button
                  onClick={() => onDelete(id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
                >
                  Видалити
                </button>

                <Link href={`/edit/${id}`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 text-sm rounded hover:bg-yellow-600 transition">
                    Редагувати
                  </button>
                </Link>
              </div>
        </li>
    )
}