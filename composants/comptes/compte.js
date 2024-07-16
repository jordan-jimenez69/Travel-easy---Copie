import React, { useContext, useEffect } from 'react';
import UserContext from '@/contexts/UserContext';
import { useRouter } from 'next/router';

export default function Compte() {
    const { user, logout } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
    }, [user, router]);
  
    if (!user) {
      return null;
    }

    return (
        <main>
            <div className="container">
                <h1 className="title">Mon Compte</h1>
                <p className="welcome-text">Bienvenue, {user.firstname} {user.name}</p>
                <button className="logout-button" onClick={logout}>Déconnexion</button>
            </div>
        </main>
    );
}

