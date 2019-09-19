'use strict'

const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const { sessionKey } = require("./keys");

/**
 * Inicializaciones
 */
const app = express(); //Utilizo express para crear un servidor
require("./database");
require("./passport/local-auth");

/**
 * Configuracion del Servidor
 */
app.set("views", path.join(__dirname, "views")); //Le indico a NodeJS donde va a estar la carpeta de las vistas.
app.engine('ejs', engine); //Definir que se va a utilizar ejs-mate como motor de plantillas HTML
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

/**
 * Configuracion de Middlewares
 */
app.use(morgan("dev")); //Muestra las peticiones que hace el cliente utilizando el modulo morgan.
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: sessionKey.KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash("signupMessage");
    app.locals.signinMessage = req.flash("signinMessage");
    next();
});


/**
 * Configuracion de las Rutas del Servidor
 */
app.use("/", require("./routes/index.routes")); //Cada vez que se acceda a "/" busque dentro del index.routes por la que coincida

/**
 * Inicializacion del Servidor
 */
app.listen(app.get("port"), () => {
    console.log("Servidor inicializado en el puerto: ", app.get("port"));
});