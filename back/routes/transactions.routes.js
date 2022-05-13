module.exports = (app) => {
    const router = require("express").Router();
    const creditcard = require("../controllers/creditcard.controller");

    router.post("/transaction.pay", creditcard.pay);
    // router.post("/creditcard.add", creditcard.add);
    

    app.use("/transactions",router);
}