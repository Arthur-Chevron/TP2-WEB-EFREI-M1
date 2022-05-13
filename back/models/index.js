const mongoose = require("mongoose");

const dbConfig = require("../config/db.config.js");

const db = {
    "mongoose": mongoose,
    "url": dbConfig.url,
    "creditcard": require("./creditcard.model.js")(mongoose)
};

module.exports = db;
