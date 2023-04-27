const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: String,
  review: String,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
