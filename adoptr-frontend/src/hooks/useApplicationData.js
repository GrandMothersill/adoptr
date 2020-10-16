import { useState, useEffect } from "react";

export default function useApplicationData() {
    //Hook to store the state and update it
    const [state, setState] = useState({
        account: {},
        type: ""
    });
    //Functions to update state
    const setUser = (user) => setState({ ...state, account: user, type: "user", rejected_animals: user.rejected_animals });
    const setShelter = (shelter) => setState({ ...state, account: shelter, type: "shelter" });
    const logout = () => {
        setState({ ...state, account: {}, type: "" });
        localStorage.clear()
    }

    //Gets the user/shelter information from localstorage each time there is a refresh and set the state at first load)
    useEffect(() => {
        const data = localStorage.getItem("accountObj");
        if (data) {
            const state = JSON.parse(data);
            setState({ ...state });
        }
    }, []);

    //Stores the user/shelter information in localStorage so that we can use it to set the state again if a refresh happens
    useEffect(() => {
        localStorage.setItem("accountObj", JSON.stringify(state));
    }, [state]);

    return {
        state,
        setUser,
        setShelter,
        logout
    };
}
