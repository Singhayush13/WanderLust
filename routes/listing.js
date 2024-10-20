const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfiq.js"); // Ensure correct path and spelling
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

// Route for listing index and creation
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"), // Multer handles the image upload
        validateListing, // Validate other listing data
        wrapAsync(listingController.createListing)
    );

// Route to render the form for a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Routes for individual listing operations
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"), // Handle image upload if updating image
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, wrapAsync(listingController.deleteListing));

// Route to render the edit form for a listing
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingController.editListing));

module.exports = router;
