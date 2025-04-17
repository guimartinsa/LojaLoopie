// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';

function Dashboard() {
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/usuario-logado/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Não autorizado');
                }
                return res.json();
            })
            .then((data) => setUserData(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>{error}</p>;
    if (!userData) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Bem-vindo, {userData.username}!</h2>
        </div>
    );
}

export default Dashboard;
