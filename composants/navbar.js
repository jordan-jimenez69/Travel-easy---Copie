import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="logo-navbar">
        <h2>TravelEasy</h2>
      </div>
      <div className='liste-navbar'>
        <ul>
          <li className="li-navbar">
            <Link href="/">Accueil</Link>
          </li>
          <li className="li-navbar">
            <Link href="/boutique">Boutique</Link>
          </li>
          <li className="li-navbar">
            <Link href="/panier">Panier</Link>
          </li>
          {user ? (
            <>
              <li className="li-navbar">
                <Link href="/compte">Mon Compte</Link>
              </li>
              <li className="li-navbar">
             <a onClick={logout} style={{ cursor: 'pointer' }}>Déconnexion</a>
              </li>
            </>
          ) : (
            <li className="li-navbar">
              <Link href="/login">Connexion</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
