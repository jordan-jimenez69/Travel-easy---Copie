import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const userId = Cookies.get('userId');

    if (userId) {
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch('/api/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        fetchOrders(userId);
      } else {
        console.error('Failed to fetch user data:', await response.text());
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`/api/userOrders?userId=${userId}`);
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        console.error('Failed to fetch orders:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const login = (userData) => {
    setUser(userData);
    Cookies.set('userId', userData._id, { expires: 7, path: '/' });
  };

  const logout = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      await fetch('/api/logout', { method: 'POST' });
      Cookies.remove('userId');
      setUser(null);
      setOrders([]);
      router.push('/login');
    }
  };

  return (
    <UserContext.Provider value={{ user, orders, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;