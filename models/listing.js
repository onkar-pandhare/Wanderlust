const mongoose = require('mongoose');
const review = require("./review.js");
const Schenma = mongoose.Schema;
 
const listingSchema = new Schenma({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],   // [longitude, latitude]
            required: true
        }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
 
listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});
 
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;