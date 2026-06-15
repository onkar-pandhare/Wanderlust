const Listing = require('../models/listing');
const maptilerClient = require('@maptiler/client');

maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
  const { search } = req.query;
  let searchTerm = search || '';

  // Restrict Search to Logged-in Users Only
  if (search && search.trim() !== '') {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be logged in to search listings!");
      return res.redirect("/login");
    }

    const searchStr = search.trim();
    const searchRegex = new RegExp(searchStr, 'i');

    const allListings = await Listing.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { country: searchRegex }
      ]
    });

    return res.render("listings/index", { 
      allListings, 
      searchTerm 
    });
  } 

  // Show all listings (no search) - accessible to everyone
  const allListings = await Listing.find({});
  res.render("listings/index", { 
    allListings, 
    searchTerm 
  });
};

// Rest of your controller remains same
module.exports.rederNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('owner');

  if (!listing) {
    req.flash("error", "The listing you requested does not exist!");
    return res.redirect("/listings");
  }

  const maptilerKey = process.env.MAPTILER_API_KEY;
  res.render("listings/show", { listing, maptilerKey });
};

module.exports.createListing = async (req, res, next) => {
  const geoData = await maptilerClient.geocoding.forward(req.body.listing.location);
  const coordinates = geoData.features[0].geometry.coordinates;

  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image.url = url;
  newListing.image.filename = filename;
  newListing.geometry = {
    type: "Point",
    coordinates,
  };

  await newListing.save();
  req.flash("success", "New listing is created successfully!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The listing you requested does not exist!");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/uploads", "/uploads/h_300,w_250");
  res.render("listings/edit", { listing, originalImage });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const geoData = await maptilerClient.geocoding.forward(req.body.listing.location);
  const coordinates = geoData.features[0].geometry.coordinates;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  listing.geometry = {
    type: "Point",
    coordinates,
  };

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image.url = url;
    listing.image.filename = filename;
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};