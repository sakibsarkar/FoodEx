import "./Banner.css";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    return (
        <div className="bannerContainer">

            <h1 data-aos="fade-up" data-aos-duration="1000" >
                Hungry! <br />Grab Some <Typewriter
                    words={['Food', 'To', 'Eat', '& Do', 'Repeat']}
                    loop={false}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={500}

                />

            </h1>
            <p data-aos="fade-up" data-aos-duration="1500"> Browse our diverse menus, savor enticing dishes, and embark on a culinary journey from the comfort of your home. Fast, reliable, and utterly delicious - Order now for a feast at your fingertips!</p>

            <Link data-aos="fade-up" data-aos-duration="1500">Explore Items</Link>
        </div>
    );
};

export default Banner;