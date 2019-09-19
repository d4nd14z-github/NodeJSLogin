'use strict'

const express = require("express");
const router = express.Router(); //Utilizo express para crear enrutadores
const passport = require("passport");

//Pagina principal de la aplicacion
router.get("/", (req, res, next) => {
    res.render("index");
});

//Registro de usuarios en la aplicacion
router.get("/signup", (req, res, next) => {
    res.render("signup");
});

//Procesamiento del registro de usuarios
router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: '/profile',
    failureRedirect: "/signup",
    passReqToCallback: true
}));

//Ingreso de usuarios en la aplicacion
router.get("/signin", (req, res, next) => {
    res.render("signin");
});

//Procesamiento del ingreso de usuarios
router.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    passReqToCallback: true
}));

router.get("/profile", (req, res, next) => {
    res.render("profile");
});


module.exports = router;