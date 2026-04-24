const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const { listingSchema,reviewSchema } = require('../schema.js');
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Reviews=require("../models/review.js");
const { validateReview } = require("../middleware.js");
const {isLoggedIn}=require("../middleware.js");
const {isReviewAuthor}=require("../middleware.js");


const  reviewController=require("../controllers/reviews.js");


//reviews
//post route for reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete route for reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
