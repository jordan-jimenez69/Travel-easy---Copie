import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
    userId: { type: String, required: true },
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    ville: { type: String, required: true },
    codePost: { type: String, required: true },
    adresse: { type: String, required: true },
    pays: { type: String, required: true },
    products: [{ type: String, required: true }],
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;