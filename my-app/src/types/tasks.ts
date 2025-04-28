export interface TasksInt {
    id: number;
    name: string;
    text: string;
    progres: "заплановано" | "в процесі" | "виконано";
    createdAt: Date;
}