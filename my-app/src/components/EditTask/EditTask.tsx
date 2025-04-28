'use client'
import { TasksInt } from '@/types/tasks';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


export default function EditTask() {
    
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const [message, setMessage] = useState<TasksInt | null>(null);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [progres, setProgres] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:3000/api/task/${id}`);
            
            const data = await res.json();
            setMessage(data);
            setName(data.name);
            setText(data.text);
            setProgres(data.progres)
        };
        fetchTask();
    }, [id]);

    const handleUpdate = async () => {
      const token = Cookies.get('token');
      if(token){
        const res = await fetch(`http://localhost:3000/api/task/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name, text, progres }),
      });

      if(res.ok){
          router.push('/');
      }else {
          console.error('Не вдалося оновити повідомлення');
        }
        setLoading(false);
      }
    };

    if(!message) return <p>Завантаження...</p>
    return(
        <div className="max-w-md mx-auto mt-10">
        <h1 className="text-xl font-bold mb-4">Редагувати повідомлення</h1>
        <div >
            <label className="block text-sm font-medium text-gray-700 mb-1">Назва завдання:</label>
            <input
            className="w-full border mb-2 px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Завдання:</label>
        <textarea
          className="w-full border mb-2 px-3 py-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Статус</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={progres}
            onChange={(e) => setProgres(e.target.value)}
          >
            <option value="заплановано">Заплановано</option>
            <option value="в процесі">В процесі</option>
            <option value="зроблено">Зроблено</option>
          </select>
        </div>
  
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? 'Завантаження...' : 'Зберегти'}
        </button>
      </div>
    )
}