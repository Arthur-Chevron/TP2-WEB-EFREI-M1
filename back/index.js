const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors(
    {
        "origin": "*"
    }
));
const db = require("./models");
const transactionRoutes = require("./routes/transactions.routes");
const creditcardRoutes = require("./routes/creditcard.routes");

db.mongoose.connect(db.url, {}).then( () => {
    console.log("connected to the database");
}).catch( (err) => {
    console.log("error in the connection", err);
});


app.use(express.json());

transactionRoutes(app);
creditcardRoutes(app);

const PORT = 8070;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});