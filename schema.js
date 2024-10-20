const Joi = require('joi');
const ExpressError = require('./utils/ExpressError.js'); // Ensure this path is correct

// Define the listing schema with image as an object
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null) // This line causes the issue
    }).required()
});


// Define the review schema (unchanged)
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
    }).required(),
});


