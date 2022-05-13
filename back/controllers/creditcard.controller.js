const db = require("../models");

const CreditCard = db.creditcard;

exports.pay = async (req, res) => {
    if(
        ! req.body.card_secret ||
        ! req.body.card_holder_name ||
        ! req.body.card_number ||
        ! req.body.card_validity ||
        ! req.body.ccv_code ||
        ! req.body.amount
    ) {
        return res.status(301).send("missing information");
    }

    const filter = { 
        card_secret: req.body.card_secret,
        card_holder_name: req.body.card_holder_name,
        card_number: req.body.card_number,
        card_validity: req.body.card_validity,
        ccv_code: req.body.ccv_code
     };

    const creditCard = await CreditCard.findOne(filter);

    if( ! creditCard || creditCard.balance < req.body.amount ) {
        res.status(302).send("insufficient funds");
    }

    const update = {balance: parseFloat(creditCard.balance) - parseFloat(req.body.amount)};
    
    CreditCard.updateOne(filter, update, (err, doc) => {
        if (err) {
            console.log("Error in payment", err);
            res.status(500).send("Error in payment");
            return;
        };
        res.status(200).send("payment success");
    });
}

exports.balance = async (req, res) => {
    if (
        ! req.query.card_secret ||
        ! req.query.card_holder_name ||
        ! req.query.card_number ||
        ! req.query.card_validity ||
        ! req.query.ccv_code
    ) {
        return res.status(301).send("missing information");
    } else {

        const filter = { 
            card_secret: req.query.card_secret,
            card_holder_name: req.query.card_holder_name,
            card_number: req.query.card_number,
            card_validity: req.query.card_validity,
            ccv_code: req.query.ccv_code
        };

        const creditCard = await CreditCard.findOne(filter);

        if( ! creditCard ) {
            res.status(302).send("couldn't find credit card");
        }

        res.json({balance: creditCard.balance});
    }
}

exports.getAll = (req, res) => {
    CreditCard.find({}).then(
        (creditCards) =>{
            res.json(creditCards);
        }
    )
};