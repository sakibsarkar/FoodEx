import "./CartDisplay.css";
import { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../Authcontext/Authcontext";
import { countTotal } from "../../Hooks & Functions/countTotal";

const CartDisplay = () => {
    const { cart, setCart, total, setTotal } = useContext(Mycontext)

    const navigate = useNavigate()

    const handleRemove = (itemIndex) => {
        let replica = [...cart]
        replica.splice(itemIndex, 1)
        setCart(replica)
        setTotal(countTotal(replica))

    }

    const isEmpty = cart.length < 1 ? true : false



    const handleProcced = async () => {
        if (isEmpty) {
            return
        }

        navigate("/payment")
    }

    return (
        <div className="cart_display">
            <h1>Cart</h1>


            {

                isEmpty ?
                    <div className="emptyCart">
                        <img src="https://i.ibb.co/F78L3K4/empty-Cart.png" alt="" />
                        <p>You didn't added anything from here</p>
                    </div>

                    :
                    <div className="displayItemsCon">
                        {
                            cart?.map((data, i) => <div className="cartItemName" key={i}>

                                <p onClick={() => handleRemove(i)}><FaRegTrashAlt /> {data?.name}</p>
                                <p>{data?.price}</p>
                            </div>
                            )


                        }


                    </div>

            }



            <div className="cartBottom">
                <h2>Total : <span>{total}Tk</span></h2>
                <button disabled={isEmpty} onClick={handleProcced}>Procced</button>
            </div>

        </div >
    );
};

export default CartDisplay;