import { useState, useEffect } from "react"
import { getCreditCardBalance, transactionPay, getAll } from "../services/card.service"

const PayForm = () => {

    const [balance, setBalance] = useState("Payment dont start")

    const [cardData, setCardData] = useState({
        card_secret: '',
        card_holder_name: '',
        card_number: '',
        card_validity: '',
        ccv_code: '',
        amount: 0
    })

    const onChangeHandler = (e) => {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        })
    }

    const [allCard, setAllCard] = useState([])

    const addCardInArrayAllCard = (newValue) => {
        setAllCard((array) => [...array, newValue])
    }

    useEffect( () => {
        getAll().then(r => {
            r.data.forEach(item => {
                addCardInArrayAllCard(item)
            })
        })
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setBalance("Payment in process")
        // prevent negative amount
        if (cardData.amount <= 0) {
            setBalance("Negative amount")
            return console.log("Negative amount")
        }
        // prevent not enough found
        const res = await getCreditCardBalance(allCard[0])
        if (res.data.balance <= cardData.amount) return console.log("Not enough found")
        // pay the transaction with the amount
        allCard[0].amount = cardData.amount
        const res2 = await transactionPay(allCard[0])
        // if success show the new balance of the card
        if (res2.data !== "payment success") {
            setBalance("Payment failed, balance : " + res.data.balance + "$")
            return console.log("Payment failed")
        }
        const res3 = await getCreditCardBalance(allCard[0])
        setBalance("Payement success, the balance of your card is now " + res3.data.balance + "$")
    }

    return (
        <div className="one-card margin-bottom">
            <p className="light-purple-gradient">Select the amount you need to pay (min: 0$ and max: 10000$)</p>
            <label>Amount</label>
            <input onChange={onChangeHandler} className="input-in-card" type="number" min="0" max="10000" name="amount"/>

            <p className="light-purple-gradient">Hello, complete the form bellow to pay.</p>

            <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
                <label>Card Number</label>
                <input className="input-in-card" type="text" name="card_number" />

                <label>Card Holder Name</label>
                <input className="input-in-card" type="text" name="card_holder_name"/>

                <label>Card Validity</label>
                <input className="input-in-card" type="text" name="card_validity"/>

                <label>Card secret</label>
                <input className="input-in-card" type="text" name="card_secret"/>

                <input className="button-color" type="submit" name="submit" />
            </form>

            <p>{ balance }</p>
        </div>
    );
}

export default PayForm