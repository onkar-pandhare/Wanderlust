const Reviews=require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  let newreview = new Reviews(req.body.review);

  newreview.author = req.user._id;

  listing.reviews.push(newreview);

  await newreview.save();

  // ✅ Skip geometry validation
  await listing.save({ validateBeforeSave: false });

  req.flash("success", "New review is created successfully!");
  res.redirect(`/listings/${listing.id}`);
};


module.exports.deleteReview=async(req,res)=>{
  let {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Reviews.findByIdAndDelete(reviewId);
  req.flash("success","Review deleted!");
  res.redirect(`/listings/${id}`);

}