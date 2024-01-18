import "./CheckoutForm.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";

const CheckoutForm = () => {

    const { total, cart } = useContext(Mycontext)

    const [paymentLoading, setPaymentLoading] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const axios = UseAxios()

    const handlePayment = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }



        setPaymentLoading(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            card: card,
            type: "card"
        })


        if (error) {
            setPaymentLoading(false)
            console.log(error.message);
            return toast.error("Something went wrong", {
                description: error.message
            })
        }

        const { data } = await axios.post("/paymentIntent", { price: total })
        






    }

    return (

        <div className="cardBox">
            <div>
                <h1>Confirm Your payment for {total}Tk</h1>
                <form onSubmit={handlePayment}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />

                    <textarea name="adress" placeholder="Your adress"></textarea>

                    <button>Pay</button>
                </form>

            </div>



            <img src="https://i.ibb.co/QnxwChg/Image-post-bro-removebg-preview.png" alt="" />
        </div>

    );
};

export default CheckoutForm;