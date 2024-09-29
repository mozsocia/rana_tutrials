const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const result = await newReview.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating review" });
  }
};