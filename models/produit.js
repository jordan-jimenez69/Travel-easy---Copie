import mongoose, { model, Schema, models } from "mongoose";

const ProduitSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categorie: { type: mongoose.Types.ObjectId, ref: 'Categorie', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }]
}, {
    timestamps: true,
});
export const Produit = models.Produit || model('Produit', ProduitSchema);