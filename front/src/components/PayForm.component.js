import { useState, useEffect } from "react"
import { getCreditCardBalance, transactionPay, getAll } from "../services/card.service"

const PayForm = () => {

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

    const [message, setMessage] = useState("Payment dont start")

    const [allCard, setAllCard] = useState([])

    const addCardInArrayAllCard = (newValue) => {
        setAllCard((array) => [...array, newValue])
    }

    useEffect( () => {
        getAll().then(r => {
            r.data.forEach(item => {
                console.log(item)
                addCardInArrayAllCard(item)
            })
        })
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setMessage("Payment in process")
        // prevent negative amount
        if (cardData.amount <= 0) {
            setMessage("Negative amount")
            return console.log("Negative amount")
        }
        // prevent dont all information
        if (
            cardData.card_holder_name === "" ||
            cardData.card_secret === "" ||
            cardData.card_validity === "" ||
            cardData.ccv_code === "" ||
            cardData.card_number === "") {
            setMessage("Missing card information")
            return console.log("Missing card information")
        }
        // prevent not enough found
        const res = await getCreditCardBalance(cardData)
        if (res.data.balance <= cardData.amount) return console.log("Not enough found")
        // pay the transaction with the amount
        const res2 = await transactionPay(cardData)
        // if success show the new balance of the card
        if (res2.data !== "payment success") {
            setMessage("Payment failed, balance : " + res.data.balance + "$")
            return console.log("Payment failed")
        }
        const res3 = await getCreditCardBalance(cardData)
        setMessage("Payement success, the balance of your card is now " + res3.data.balance + "$")
    }

    return (
        <div className="one-card margin-bottom">
            <p className="light-purple-gradient">Select the amount of your purchase</p>

            <div className="one-input">
                <label>Amount</label>
                <input onChange={onChangeHandler} className="input-in-card" type="number" min="0" max="10000" name="amount"/>
            </div>

            <p className="light-purple-gradient">Complete the form card bellow to pay. All fields are required</p>

            <form onChange={onChangeHandler} onSubmit={onSubmitHandler}>
                <div className="one-input">
                    <label>Card Number</label>
                    <input className="input-in-card" type="text" name="card_number" />
                </div>

                <div className="one-input">
                    <label>Card Holder Name</label>
                    <input className="input-in-card" type="text" name="card_holder_name"/>
                </div>

                <div className="one-input">
                    <label>Card Validity</label>
                    <input className="input-in-card" type="text" name="card_validity"/>
                </div>

                <div className="one-input">
                    <label>Card secret</label>
                    <input className="input-in-card" type="text" name="card_secret"/>
                </div>

                <div className="one-input">
                    <label>CCV Code</label>
                    <input className="input-in-card" type="text" name="ccv_code"/>
                </div>

                <input className="button-color" type="submit" name="submit" />
            </form>

            <p>{ message }</p>
        </div>
    );
}

export default PayForm