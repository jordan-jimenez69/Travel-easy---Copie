import { Utilisateur } from '@/models/user';
import { mongooseConnect } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';
import Cookies from 'cookies';

export default async function handler(req, res) {
  try {
    await mongooseConnect();

    const cookies = new Cookies(req, res);
    const userId = cookies.get('userId');

    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }

    // AJOUT : Gestion des requêtes GET pour récupérer les données utilisateur
    if (req.method === 'GET') {
      const user = await Utilisateur.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      console.log('Données utilisateur récupérées:', user); // Log pour debug
      return res.status(200).json(user);
    }

    // Gestion des requêtes PUT (mise à jour)
    if (req.method === 'PUT') {
      const { _id, firstname, name, email, password, adresse, ville, codePost, pays } = req.body;

      if (!_id || _id !== userId) {
        return res.status(403).json({ message: 'Accès interdit.' });
      }

      const updateData = {};

      if (firstname) updateData.firstname = firstname;
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (adresse) updateData.adresse = adresse;
      if (ville) updateData.ville = ville;
      if (codePost) updateData.codePost = codePost;
      if (pays) updateData.pays = pays;

      if (password && password.trim() !== '') {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await Utilisateur.findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      console.log('Utilisateur mis à jour:', updatedUser); 
      return res.status(200).json(updatedUser);
    }

 
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Méthode ${req.method} non autorisée.`);
    
  } catch (error) {
    console.error('Erreur dans le handler :', error);
    return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
}