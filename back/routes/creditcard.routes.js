module.exports = (app) => {
    const router = require("express").Router();
    const creditcard = require("../controllers/creditcard.controller");

    router.get("/getAll", creditcard.getAll);
    router.get("/creditcard.balance", creditcard.balance);

    app.use("/creditcards",router);
}