import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import Stripe from 'stripe';
import { Produit } from '@/models/produit';

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await mongooseConnect();

            const { userId, firstname, name, ville, codePost, adresse, pays, products } = req.body;

            if (!userId) {
                return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis.' });
            }

            const line_items = [];
            const productIds = products.map(p => p._id);

            const productsInfos = await Produit.find({ _id: { $in: productIds } });

            for (const product of products) {
                const productInfo = productsInfos.find(p => p._id.toString() === product._id);
                const quantity = product.quantity;

                if (quantity > 0 && productInfo) {
                    line_items.push({
                        price_data: {
                            currency: 'usd',
                            product_data: { name: productInfo.title },
                            unit_amount: productInfo.price * 100,
                        },
                        quantity: quantity
                    });
                }
            }

            // Créer la nouvelle commande avec userId
            const newOrder = new Order({
                userId,
                firstname,
                name,
                ville,
                codePost,
                adresse,
                pays,
                products: productIds,
            });
            await newOrder.save();

            // Créer une session Stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancel`,
            });

            res.status(201).json({ url: session.url });
        } catch (error) {
            console.error("Erreur lors de la création de la session Stripe :", error);
            res.status(500).json({ error: 'Erreur lors de la création de la commande', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}