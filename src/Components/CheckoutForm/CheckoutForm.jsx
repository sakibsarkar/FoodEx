import "./CheckoutForm.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mycontext } from "../../Authcontext/Authcontext";
import { todayDate } from "../../Hooks & Functions/todayDate";

const CheckoutForm = () => {

    const { total, cart, setTotal, setCart, user } = useContext(Mycontext)
    const navigate = useNavigate()

    if (total < 1) {
        navigate("/")
    }

    const [paymentLoading, setPaymentLoading] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const axios = UseAxios()

    const handlePayment = async (e) => {
        e.preventDefault()

        const address = e.target.address.value

        if (!stripe || !elements || paymentLoading) {
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

        const { paymentIntent, error: err } = await stripe.confirmCardPayment(data?.client_secret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymus"
                }
            }
        })

        if (err) {
            return toast.error("Something went wrong")
        }

        if (paymentIntent?.status === "succeeded") {
            const date = todayDate()
            const orderObj = {
                user_name: user?.displayName,
                user_email: user?.email,
                total: total,
                order_status: "pending",
                date: date,
                orderData: cart,
                vendor_email: cart[0].vendor_email || ""
            }

            await axios.post("/placeOrder", orderObj)

            setTotal(0)
            setCart([])
            setPaymentLoading(false)
            toast.success(`${user?.displayName} your order has been placed`, {
                description: "You will soon get your order"
            })

        }



        setPaymentLoading(false)



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

                    <textarea name="address" placeholder="Your adress" required />

                    <button>Pay</button>
                </form>

            </div>



            <img src="https://i.ibb.co/QnxwChg/Image-post-bro-removebg-preview.png" alt="" />
        </div>

    );
};

export default CheckoutForm;