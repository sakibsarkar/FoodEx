import "./CommentsCards.css";
import ReactStars from "react-rating-stars-component";

const CommentsCards = ({ comment_data }) => {

    const { _id, name, photo, ratings, comment, shop_id, visible } = comment_data

    const img = photo || "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"

    return (
        <div className="comment_box">

            <div className="comment_row">

                <div className="img">
                    <img src={img} alt="" />
                </div>

                <div className="comment_col">
                    <p>{name}</p>
                    <ReactStars
                        count={ratings}
                        edit={false}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        size={18}
                        isHalf={true}
                        activeColor="#ffd700"
                    />
                </div>

            </div>

            <p>{comment}</p>


        </div>
    );
};

export default CommentsCards;