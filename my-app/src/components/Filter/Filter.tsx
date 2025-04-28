import { useState } from "react";

type FilterProps = {
    onFilter: (progres: string) => void;
}

export default function Filter({onFilter}:FilterProps) {
    const [progres, setProgres] = useState('');

    return (
        <div className="w-full bg-white shadow p-4 flex items-center justify-center">
            <div className="flex gap-4 w-full max-w-4xl">
                <select
                value={progres}
                onChange={(e) => setProgres(e.target.value)}
                className="border p-2 rounded w-full"
                >
                <option value="">Оберіть статус</option>
                <option value="заплановано">Заплановано</option>
                <option value="в процесі">В процесі</option>
                <option value="зроблено">Зроблено</option>
                </select>

                <button
                onClick={() => onFilter(progres)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                Пошук
                </button>
            </div>
        </div>
    );
}