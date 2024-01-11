import "./Home.css";
import Advertisement from "../../Components/Advertisement/Advertisement";
import Banner from "../../Components/Banner/Banner";
import DisplayItems from "../../Components/DisplayItems/DisplayItems";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {

    const axios = UseAxios();

    const [biryani, setBiryani] = useState([])
    const [kebab, setKebab] = useState([])
    const [burger, setBurger] = useState([])

    const { data } = useQuery({
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



    


    return (
        <div>

            <Banner />
            <DisplayItems heading={"Biryani"} itemData={biryani} />
            <DisplayItems heading={"Kebab"} itemData={kebab} />
            <DisplayItems heading={"Burger"} itemData={burger} />
            <Link className="viewMore">Find More <IoFastFoodOutline /></Link>
            <Advertisement />
        </div>
    );
};

export default Home;