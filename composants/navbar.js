import { useState, useContext } from 'react';
import Link from 'next/link';
import UserContext from '../contexts/UserContext';

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-navbar">
        <h2>TravelEasy</h2>
      </div>
      <div className="menu-burger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`liste-navbar ${menuOpen ? 'active' : ''}`}>
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
              <li className="li-navbar-btnde">
                <a onClick={logout} style={{ cursor: 'pointer' }}>Déconnexion</a>
              </li>
            </>
          ) : (
            <ul>
              <li className="li-navbar-btnco">
                <Link href="/login">Connexion</Link>
              </li>
              <li className="li-navbar-btnreg">
                <Link href="/register">Inscription</Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
}
