const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing"); // Correct the path if needed
const Review = require("../models/review"); // Correct the path if needed
const{validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const ReviewController = require("../controllers/review.js");

//Reviews (CreateReview)

router.post("/", validateReview, isLoggedIn,  wrapAsync (ReviewController.createReview));


// Delete Review
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.deleteReview));

module.exports = router;