import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adresse: { type: String, required: false }, 
  ville: { type: String, required: false },   
  codePost: { type: String, required: false },
  pays: { type: String, required: false },    

  proprietes: { type: Object },
  
});

export const Utilisateur = mongoose.models.Utilisateur || mongoose.model('Utilisateur', userSchema);