import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
    if (req.method === 'POST') {

    }
}