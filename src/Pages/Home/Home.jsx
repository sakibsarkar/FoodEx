import "./Home.css";
import Advertisement from "../../Components/Advertisement/Advertisement";
import Banner from "../../Components/Banner/Banner";
import Delivery from "../../Components/Delivery/Delivery";
import DisplayItems from "../../Components/DisplayItems/DisplayItems";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";

const Home = () => {
    const [shouldShake, setShouldShake] = useState(false);
    const axios = UseAxios();

    const [biryani, setBiryani] = useState([])
    const [kebab, setKebab] = useState([])
    const [burger, setBurger] = useState([])

    const { data, isLoading } = useQuery({
        queryKey: ["biryani"],
        queryFn: async () => {
            // const res = await fetch("http://localhost:5000/api/food?limit=4&&category=biryani")
            // const result = res.json()
            const { data: biryaniData } = await axios.get("/food?limit=4&&category=biryani")
            setBiryani(biryaniData)

            const { data: kebabData } = await axios.get("/food?limit=4&&category=kebab")
            setKebab(kebabData)

            const { data: burgerData } = await axios.get("/food?limit=4&&category=burger")
            setBurger(burgerData)
            return []

        }
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShouldShake(true);

            setTimeout(() => {
                setShouldShake(false);
            }, 1000);

        }, 3000);

        return () => clearInterval(intervalId);
    }, []);



    const options = {
        // your options here, for example:
        duration: 600,
        smooth: true,
    };



    return (
        <div>
            <div className={shouldShake ? "scrollToTop shake" : "scrollToTop"} onClick={() => animateScroll.scrollToTop(options)}>
                <FaRegArrowAltCircleUp />
            </div>
            <Banner />
            <DisplayItems heading={"Biryani"} itemData={biryani} />
            <DisplayItems heading={"Kebab"} itemData={kebab} />
            <DisplayItems heading={"Burger"} itemData={burger} />
            <Link className="viewMore">Find More <IoFastFoodOutline /></Link>
            <Advertisement />
            <Delivery />
        </div >
    );
};

export default Home;