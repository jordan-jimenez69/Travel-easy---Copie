import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    try {
      await mongooseConnect();

      const user = await Utilisateur.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      res.status(200).json({ _id: user._id, firstname: user.firstname, name: user.name, email: user.email });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
