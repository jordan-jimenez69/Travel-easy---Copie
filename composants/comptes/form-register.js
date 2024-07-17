import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères et une majuscule.');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, name, email, password }),
      });

      const data = await response.json();

       if (response.ok) {
        const userConfirmed = window.confirm("Compte créé avec succès ! Vous allez être redirigé vers la page de connexion.");
        if (userConfirmed) {
          router.push('/login');
        }
        setError('');
        setFirstname('');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (error) {
      setError('Erreur du serveur. Veuillez réessayer plus tard.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div className="register-form-group">
          <label htmlFor="firstname">Prénom:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn btn-primary">S'inscrire</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <p className="register-login-link">
        Vous avez déjà un compte ? <Link href={"/login"}>Connectez-vous</Link>.
      </p>
    </div>
  );
};

export default RegisterForm;
