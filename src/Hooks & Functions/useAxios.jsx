import axios from "axios";

const instance = axios.create({
    baseURL: "https://food-ex-server-beta.vercel.app/api",
    withCredentials: true
})


const UseAxios = () => {
    instance.interceptors.response.use((res) => {
        return res
    },
        (err) => {
            const status = err?.response?.status
            if (status === 401 || status === 4.3) {
                console.log("tme fail")
            }
            return Promise.reject(err)
        }
    )
    return instance
}

export default UseAxios