const express =require('express');
const router = express.Router();
const stripe =require('stripe');
const Stripe =
stripe('sk_test_51N4JalFVwuUqslAOH4sD7qlGye9pMAiOE29Ygwm4f6Lv1HeYezMqmH6Ng8kl7HllH6PP4qSeR1xYIofEVbXpwf0I00klGxumke');
router.post('/', async (req, res) => { console.log(req.body)
let status, error;
const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});
status = 'success';
} catch (error) {
console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;