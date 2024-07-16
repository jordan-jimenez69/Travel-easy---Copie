import Cookies from 'cookies';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('userId', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: 'Déconnexion réussie' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}