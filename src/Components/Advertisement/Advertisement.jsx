import "./Advertisement.css";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Advertisement = () => {
    return (
        <div className="addContaier">
            <Parallax bgImage="https://www.moorni.co.uk/wp-content/uploads/2023/12/indian-food-in-a-restaurant.jpg" strength={500}>
                <div className="addCotent" data-aos="fade-up">
                    <h1>Eat Food From <br /> Your Fav Restaurant</h1>
                    <Link >View Restaurants</Link>
                </div>
            </Parallax>

        </div>
    );
};

export default Advertisement;

