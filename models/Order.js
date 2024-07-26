import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    ville: { type: String, required: true },
    codePost: { type: String, required: true },
    adresse: { type: String, required: true },
    pays: { type: String, required: true },
    products: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Produit' }, // Référence à 'Produit'
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: true },
        }
    ],
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
