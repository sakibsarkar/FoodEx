import "./CartDisplay.css";
import { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Mycontext } from "../../Authcontext/Authcontext";
import { countTotal } from "../../Hooks & Functions/countTotal";

const CartDisplay = () => {
    const { cart, setCart, total, setTotal } = useContext(Mycontext)


    const handleRemove = (itemIndex) => {
        let replica = [...cart]
        replica.splice(itemIndex, 1)
        setCart(replica)
        setTotal(countTotal(replica))

    }

    const isEmpty = cart.length < 1 ? true : false


    return (
        <div className="cart_display">
            <h1>Cart</h1>

            <div className="displayItemsCon">
                {
                    cart?.map((data, i) => <div className="cartItemName" key={i}>

                        <p onClick={() => handleRemove(i)}><FaRegTrashAlt /> {data?.name}</p>
                        <p>{data?.price}</p>
                    </div>
                    )


                }


            </div>

            <div className="cartBottom">
                <h2>Total : {total}Tk</h2>
                <button disabled={isEmpty}>Procced</button>
            </div>

        </div >
    );
};

export default CartDisplay;