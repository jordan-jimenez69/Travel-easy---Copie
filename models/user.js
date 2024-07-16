import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Utilisateur = mongoose.models.Utilisateur || mongoose.model('Utilisateur', userSchema);
