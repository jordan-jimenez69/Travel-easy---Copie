import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import { Produit } from '@/models/produit';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "L'ID de l'utilisateur est requis." });
        }

        try {
            await mongooseConnect();

            const orders = await Order.find({ userId }).exec();

            if (!orders.length) {
                return res.status(404).json({ error: "Aucune commande trouvée pour cet utilisateur." });
            }

            const productIds = orders.flatMap(order =>
                order.products.map(product => product._id)
            );

            const productsInfos = await Produit.find({ _id: { $in: productIds } }).exec();

            const productsMap = productsInfos.reduce((acc, produit) => {
                acc[produit._id.toString()] = produit;
                return acc;
            }, {});

            const formattedOrders = orders.map(order => ({
                _id: order._id,
                createdAt: order.createdAt,
                products: order.products.map(product => ({
                    name: productsMap[product._id.toString()]?.title,
                    quantity: product.quantity,
                    price: productsMap[product._id.toString()]?.price,
                    size: product.size
                }))
            }));

            res.status(200).json(formattedOrders);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes :", error);
            res.status(500).json({ error: 'Erreur lors de la récupération des commandes', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}