'use client';

import { useEffect, useState } from 'react';

export default function TasksPage() {

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkDbConnection = async () => {
      const response = await fetch('/api/test');
      const data = await response.json();
      setMessage(data.message); 
    };

    checkDbConnection();
  }, []);

  return (
    <div>
      {message}
    </div>
  );
}