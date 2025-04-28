'use client'

import { TasksInt } from '@/types/tasks';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/components/Header/Header';
import TaskCard from '@/components/TaskCard/TaskCard';
import Filter from '@/components/Filter/Filter';


export default function Home() {
  const [tasks, setTasks] = useState<TasksInt[]>([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  const tokenSearch = ()=>{
    const token = Cookies.get('token'); // Отримуємо токен з куків
    if (token) {
        console.log('Токен знайдений:', token);
    } else {
        console.log('Токен не знайдений');
        router.push('/auth');
    }
  }

  const fetchTasks = async () => {
    const token = Cookies.get('token');
    if(token){
      const res = await fetch('/api/tasks',{
        method: 'GET',
        headers: {
          'ContentType': 'application/json',
          'Authorization': `Bearer ${token}`
        },}
      );
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        console.error('Не вдалося отримати повідомлення');
      }
      setLoading(false);
    }
  };

  const filterTasks = async (progres: string) =>{
    if(progres!==""){
      const res = await fetch('/api/filter', {
        method: 'POST',
        headers: {
          'ContentType': 'application/json',
        },
        body: JSON.stringify({progres}),
      });
      if (res.ok) {
        const data = await res.json();
       
        setTasks(data);
        
      } else {
        console.error('Не вдалося отримати повідомлення');
      }
      setLoading(false);
    }else{
      fetchTasks();
    }
  }

  const deleteTask = async (id: number) => {
    const res = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTasks((prev) => prev.filter((msg) => msg.id !== id));
    } else {
      console.error('Не вдалося видалити повідомлення');
    }
  };

  useEffect(() => {
    tokenSearch();
    fetchTasks();
  }, []);

  return (
    <>
      <Header/>
      <Filter onFilter={filterTasks}/>
      <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Усі завдання</h1>

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="space-y-4">
          {Array.isArray(tasks) ? tasks.map((task) => (
            <TaskCard key={task.id}
             id={task.id}
              name={task.name}
              text={task.text}
              createdAt={task.createdAt}
              progres={task.progres}
              onDelete={deleteTask}
            />
          )): "Список порожній =("}
        </ul>
      )}
    </div>
    </>
  );
}
