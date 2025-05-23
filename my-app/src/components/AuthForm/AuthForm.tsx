'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {'ContentType': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const data = await res.json();
            if(!res.ok) {
                setError(data.error || "Щось пішло не так...");
            }else{
                setEmail('');
                setPassword('');
                const time = 5 / 1440; 
                Cookies.set('token', data, { expires: time, secure: true, sameSite: 'Strict' });
                router.push('/')
            }
        } catch (error) {
            setError('Помилка при надсиланні')
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-sm mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Вхід</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введіть ваш email"
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введіть ваш пароль"
                        required
                    />
                    </div>
                    <div className="flex justify-center">
                    <button 
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Увійти
                    </button>
                    </div>
                    <div className="mt-4">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}