import "./SearchSuggestion.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchSuggestion = () => {
    const axios = UseAxios()

    const [itemNames, setItemNames] = useState([])
    // suggestion that mathed with input feild
    const [suggetion, setSuggetion] = useState([])



    const inputRef = useRef(null)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const searchDefaultValue = queryParams.get("search") || ""

    const { data } = useQuery({
        queryKey: ["itemNames"],
        queryFn: async () => {
            const { data: result = [] } = await axios.get("/food/names")
            let arr = []
            result?.map(e => {
                arr.push(e?.name)

            })

            setItemNames(arr)


            return result
        }
    })



    const handleSearch = (event) => {
        let matched = []
        let value = event?.target?.value.toLowerCase() || ""

        if (value === "") {
            // navigate(`/delivery?search=${value}`)
            setSuggetion([])
            return setSuggetion("")
        }

        if (event.keyCode === 13) {
            inputRef.current.blur()
            navigate(`/delivery?search=${value}`)
            setSuggetion([])
            return
        }
        itemNames.map(e => {
            if (e.toLowerCase().includes(value)) {
                ""
                matched.push(e)
            }
        })
        setSuggetion(matched)

    }

    const navigate = useNavigate()

    const handleGoForSearch = (value) => {
        setSuggetion([])
        navigate(`/delivery?search=${value}`)
        inputRef.current.blur()
        inputRef.current.value = value
    }


    const handleSearchButton = () => {
        setSuggetion([])
        const value = inputRef.current.value
        navigate(`/delivery?search=${value}`)
        inputRef.current.blur()
        inputRef.current.value = value
    }


    return (
        <>

            <div className="searchBar">
                <input type="text" placeholder="Biriyani near me"
                    onKeyUp={handleSearch}
                    ref={inputRef}
                    defaultValue={searchDefaultValue}

                />
                <button onClick={handleSearchButton}>Find food</button>
                {
                    suggetion?.length > 0 ?
                        <div className="suggestion_container">
                            {
                                suggetion?.map((suggestionValue, i) => <p
                                    key={i}
                                    onClick={() => handleGoForSearch(suggestionValue)}
                                >
                                    {suggestionValue}
                                </p>)
                            }
                        </div>
                        : ""
                }
            </div>

        </>
    );
};

export default SearchSuggestion;