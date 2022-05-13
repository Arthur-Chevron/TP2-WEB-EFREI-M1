This NodeJs application is a sample micro-service API that handles creditcard transactions.
You may communicate with it using the RPC (remote procedure call) API paradigm.
To install it, navigate your terminal/cmd to the root folder of this app and run:
    npm install
    npm start

This app handles its own database connection, all you need to do is call its endpoints:

"get:
    /creditcards/getAll                 (1)
    /creditcards/creditcard.balance     (2)

post:
    /transactions/transaction.pay       (3)"

endpoint 1:
    - use it to fetch all creditcards with their associated information.
    - parameters: no prameters needed.
    - return:
        a list of all creditcard objects in the database.

endpoint 2:
    - use it to check the balance of a given creditcard
    - parameters: 
        card_secret
            Type: String
            required
        card_holder_name
            Type: String
            required
        card_number
            Type: String
            required
        card_validity
            Type: String
            required
        ccv_code
            Type: String
            required
    return:
        an object containing the balance:
            {"balance": xxx}

endpoint 3:
    - use it to perform a payment transaction
    - parameters: 
        card_secret
            Type: String
            required
        card_holder_name
            Type: String
            required
        card_number
            Type: String
            required
        card_validity
            Type: String
            required
        ccv_code
            Type: String
            required
        amount
            Type: Number
            required
    - return:
        a string, representeing status success, or an error