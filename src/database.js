'use strict'

const mongoose = require("mongoose");
const { mongodb } = require("./keys");

mongoose.connect(mongodb.URI , { useNewUrlParser: true,
                                 useUnifiedTopology: true })
    .then(db => console.log('Database Connection (OK)'))
    .catch(err => console.error(err));