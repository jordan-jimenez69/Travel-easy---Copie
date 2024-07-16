import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { firstname, name, email, password } = req.body;

  if (!firstname || !name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Validation du mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères et une majuscule.' });
  }

  try {
    await mongooseConnect();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new Utilisateur({ firstname, name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
}
