const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

exports.getPaymentsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const payments = await Payment.find({ email });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};

exports.checkPaymentExists = async (req, res) => {
  try {
    const { email } = req.params;
    const { month, year } = req.query;
    if (!email || !month || !year) {
      return res.status(400).json({ error: "Email, month, and year are required." });
    }

    const payment = await Payment.findOne({
      email,
      month: { $regex: new RegExp(month, 'i') },
      year
    });

    res.json({ exists: !!payment });
  } catch (error) {
    console.error("Failed to get payment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const result = await newPayment.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating payment" });
  }
};