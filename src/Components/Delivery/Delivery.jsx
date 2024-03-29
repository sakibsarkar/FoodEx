import "./Delivery.css";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const Delivery = () => {
    {/* https://i.ibb.co/R42s3Nv/delivery-Guy.png */ }

    return (
        <div className="deliveryContainer">
            <Tilt >
                <div className="graphic" data-aos="zoom-in" data-aos-duration="1000">
                    <img src="https://i.ibb.co/R42s3Nv/delivery-Guy.png" alt="" />
                </div>
            </Tilt>

            <div className="deliveryContent" data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1000">
                <h1>You are hungry <br /> we are <span>Fast</span></h1>
                <h3>30minute Super Fast Delivery</h3>
                <p>Order food online the easy way. Whether you're too tired to cook, craving fast food favourites or looking to try something new, it's never been easier to order in takeaway.Simply tap to add desired items to your basket, before heading to the checkout to pay once you've everything you need. Once you've done that, all you need to do is relax and await your delivery.</p>

                <Link>Order Now</Link>


            </div>
        </div>
    );
};

export default Delivery;