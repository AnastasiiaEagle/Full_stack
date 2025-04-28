'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Header() {
    const router = useRouter();

    const handleSubmit = () => {
        Cookies.remove('token');
        router.push('/auth');
    }

    return(
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/about">Про нас</Link>
                </li>
                <li>
                    <Link href="/posts">Створити завдання</Link>
                </li>
            </ul>
            <button onClick={handleSubmit} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Вихід
            </button>
        </header>
    )
}