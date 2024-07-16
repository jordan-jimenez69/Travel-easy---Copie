import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = Cookies.get('userId');
      console.log('userId from cookie:', userId);

      if (userId) {
        try {
          const response = await fetch('/api/users', {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Response status:', response.status);

          if (response.ok) {
            const userData = await response.json();
            console.log('User data fetched:', userData);
            setUser(userData);
          } else {
            console.log('Failed to fetch user data:', await response.text());
            setUser(null);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur :', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log('Setting userId cookie:', userData._id);
    Cookies.set('userId', userData._id, { expires: 7, path: '/' });
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    Cookies.remove('userId');
    setUser(null);
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
