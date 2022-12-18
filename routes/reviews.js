const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const review = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

// Route from new review
router.post("/", validateReview, isLoggedIn, catchAsync(review.createReview));
// Route to delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.delete)
);

module.exports = router;
// star solid &#9733;
// star white &#9734;
