import "./SearchSuggestion.css";
import UseAxios from "../../Hooks & Functions/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const SearchSuggestion = () => {
    const axios = UseAxios()

    const [itemNames, setItemNames] = useState([])
    // suggestion that mathed with input feild
    const [suggetion, setSuggetion] = useState([])


    // slecteed suggestion index
    const [index, setIndex] = useState(-1)

    // selected suggestion by keyboard
    const [selected, setSelected] = useState("")



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
        const keyCode = event.keyCode

        let currentIndex = index

        if (keyCode !== 40 && keyCode !== 38) {
            currentIndex = -1
            setIndex(-1)
            setSelected("")
        }


        // clicking enter with selected suggestion value
        if (keyCode === 13 && selected) {
            inputRef.current.value = selected
            inputRef.current.blur()
            navigate(`/delivery?search=${selected}`)
            setSuggetion([])
            return
        }

        // clicking enter with selected typed searching value
        if (keyCode === 13) {
            inputRef.current.blur()
            navigate(`/delivery?search=${value}`)
            setSuggetion([])
            return
        }


        if (value === "") {
            // navigate(`/delivery?search=${value}`)
            setSelected("")
            setIndex(-1)
            setSuggetion([])
            return
        }



        itemNames?.map(e => {
            if (e.toLowerCase().includes(value)) {
                ""
                matched.push(e)
            }
        })
        setSuggetion(matched)




        // down keyCode => 40
        // up keyCode => 38

        if (keyCode === 40) {
            currentIndex += 1

            if (currentIndex > matched.length - 1) {
                currentIndex = -1
            }

            setIndex(currentIndex)
            setSelected(matched[currentIndex])

        }

        if (keyCode === 38) {
            currentIndex -= 1

            if (currentIndex < 0) {
                currentIndex = -1
            }

            setIndex(currentIndex)
            setSelected(matched[currentIndex])

        }




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
                                suggetion?.map((value, i) => <p
                                    className={value === selected ? "selected" : ""} key={i}
                                    onClick={() => handleGoForSearch(value)}
                                >
                                    <CiSearch /> {value}
                                </p>)
                            }
                        </div>
                        : ""
                }
            </div >

        </>
    );
};

export default SearchSuggestion;