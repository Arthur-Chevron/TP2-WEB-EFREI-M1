import axios from 'axios'

const URL = 'http://localhost:8070/'

export const getAll = async () => {
    try {
        return await axios.get(
            URL + 'creditcards/getAll',
        )
    } catch(err) {
        console.log("addCar error : " + err)
    }
}

export const getCreditCardBalance = async (data) => {
    try {
        return await axios.get(
            URL + 'creditcards/creditcard.balance' +
            '?card_secret=' + data.card_secret +
            "&card_holder_name=" + data.card_holder_name +
            "&card_number=" + data.card_number +
            "&card_validity=" + data.card_validity +
            "&ccv_code=" + data.ccv_code,
        )
    } catch(err) {
        console.log("addCar error : " + err)
    }
}

export const transactionPay = async (data) => {
    try {
        return await axios.post(
            URL + 'transactions/transaction.pay',
            data
        )
    } catch(err) {
        console.log("addCar error : " + err)
    }
}