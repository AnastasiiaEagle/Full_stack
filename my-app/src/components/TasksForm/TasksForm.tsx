'use client'

import { useState } from "react"

export default function MessageForm() {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: {'ContentType': 'application/json'},
                body: JSON.stringify({name, text}),
            });
            if(!res.ok) {
                const data = await res.json();
                setError(data.error || "Щось пішло не так...");
            }else{
                setSuccess('Повідомлення надіслано');
                setName('');
                setText('');
            }
        } catch (error) {
            setError('Помилка при надсиланні')
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Створити завдання</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва завдання:</label>
                <input
                type="text"
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setName(e.target.value)}
                value={name}
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Завдання:</label>
                <textarea
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setText(e.target.value)}
                value={text}
                required
                />
            </div>
            <button 
                type="submit" 
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
            >
                {loading ? "Зачекайте..." : "Створити"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    )
}