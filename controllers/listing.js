const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing You Requested for Does Not Exist!");
        res.redirect("/listings");
    }
    res.render("listing/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        // Ensure req.file is defined after uploading
        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        } else {
            throw new Error("Image upload failed. No file found.");
        }

        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        req.flash("error", "Failed to create listing. Please try again.");
        console.error("Error creating listing:", error); // Log detailed error
        res.redirect("/listings/new");
    }
};



module.exports.editListing = async (req, res) => {

    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You Requested for Does Not Exist!");
        res.redirect("/listings");
    }
    res.render("listing/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
