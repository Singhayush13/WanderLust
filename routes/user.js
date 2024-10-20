    const express = require("express");
    const router = express.Router();
    const wrapAsync = require("../utils/wrapAsync.js");
    const passport = require("passport");
    const { saveRedirectUrl } = require("../middleware.js");
    const UserController = require("../controllers/user.js");

    router.get("/signup", UserController.rendersignup);

    router.post("/signup", wrapAsync(UserController.signup));

    router.get("/login",UserController.renderloginform);

    router.post("/login", saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), UserController.login);


    router.get("/logout",UserController.logout);

    module.exports = router;