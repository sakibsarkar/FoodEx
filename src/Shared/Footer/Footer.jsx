import "./Footer.css";
import wave from "../../assets/wav.png";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <img src={wave} alt="" draggable={false} />
            <div className="footerWrapper">
                <div className="footerLogo">
                    <h1>FoodEX</h1>
                    <p>Order food online the easy way. Whether you're too tired to cook, craving fast food favourites or looking to try something new, it's never been easier to order in takeaway.Simply tap to add desired items to your basket, before heading to the checkout to pay once you've everything you need</p>
                    <a href="">Subscribe</a>
                </div>

                <div className="footerBox">
                    <h1>Social Links</h1>
                    <div className="socialLinks">
                        <a href=""><FaFacebookF /></a>
                        <a href=""><FaTwitter /></a>
                        <a href=""><FaTiktok /></a>
                        <a href=""><FaInstagram /></a>
                        <a href=""><FaYoutube /></a>
                    </div>
                </div>


                <div className="footerBox">
                    <h1>Our office</h1>
                    <p>Road # 9, East kazipara, mirpur - 1, 1218</p>
                    <p>Saturday - Sunday | 11:00 - 5:00 </p>
                </div>

                <form>
                    <h1>Lets Talk</h1>
                    <input type="text" placeholder="Your Name" required />
                    <input type="text" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" />
                    <button>Send</button>
                </form>
            </div>
            <div className="footerBottom">
                <p>Copyrighted by <span>@foodex</span>. All right reserved 2023</p>
            </div>
        </footer>
    );
};

export default Footer;

