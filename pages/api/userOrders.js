import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { userId } = req.query;

        await mongooseConnect();
        
        const orders = await Order.find({ userId });

        res.status(200).json(orders);
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}