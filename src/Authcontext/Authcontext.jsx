import UseAxios from "../Hooks & Functions/useAxios";
import auth from "../FirebaseCnfig";
import axios from "axios";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const Mycontext = createContext(null)

const Authcontext = ({ children }) => {
    const [paymentObject, setPaymentObject] = useState({})
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [waitForUser, setWaitForUser] = useState(true)
    const [toast, setToast] = useState(null)
    const [role, setRole] = useState("")
    const [roleLoading, setRoleLoading] = useState(true)
    const [naviGateLocation, setNaviGateLocation] = useState("")//it will be use in register page we will set the value from log in page


    const axios = UseAxios()


    const googleAuthentication = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }


    const gitHubAuthentication = () => {
        setLoading(true)
        const provider = new GithubAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createAccountWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {

        onAuthStateChanged(auth, async (USER) => {

            if (USER) {
                const { data } = await axios.get(`/role?email=${USER?.email}`)
                setRole(data?.role)
                setUser(USER)
                setLoading(false)
                return;
            }

            setRole("")
            setUser(USER)
            setLoading(false)

        })

    }, [waitForUser, axios])


    const items = {
        loading,
        googleAuthentication,
        gitHubAuthentication,
        setWaitForUser,
        user,
        logOut,
        loginWithEmail,
        createAccountWithEmail,
        toast,
        setToast,
        naviGateLocation,
        setNaviGateLocation,
        role,
        roleLoading,
        paymentObject,
        setPaymentObject
    }
    return (
        <Mycontext.Provider value={items}>
            {children}
        </Mycontext.Provider>
    );
};

export default Authcontext;