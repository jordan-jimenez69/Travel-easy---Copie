import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserContext from '../../contexts/UserContext';
import Cookies from 'js-cookie';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        // Supprimer les anciens cookies avant de définir le nouveau
        Cookies.remove('userId');
        Cookies.set('userId', userData._id, { expires: 7, path: '/' });
        router.push('/compte');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <section className='login-page-section'>
      <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Connexion</button>
        </form>
        <p className="register-link">
          Si vous n'avez pas de compte, <Link href="/register">créez-en un</Link>.
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
