import { useState, useEffect } from "react";

export default function useApplicationData() {
    //Hook to store the state and update it
    const [state, setState] = useState({
        user: {},
        shelter: {}
    });
    //Functions to update state
    const setUser = (user) => setState({ ...state, shelter: {}, user });
    const setShelter = (shelter) => setState({ ...state, user: {}, shelter });

    //Gets the user/shelter information from localstorage each time there is a refresh and set the state at first load)
    useEffect(() => {
        const data = localStorage.getItem("userObj");
        if (data) {
            const user = JSON.parse(data);
            setState({ ...state, user });
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem("shelterObj");
        if (data) {
            const shelter = JSON.parse(data);
            setState({ ...state, shelter });
        }
    }, []);


    //Stores the user/shelter information in localStorage so that we can use it to set the state again if a refresh happens
    useEffect(() => {
        localStorage.setItem("userObj", JSON.stringify(state.user));
    }, [state.user]);

    useEffect(() => {
        localStorage.setItem("shelterObj", JSON.stringify(state.shelter));
    }, [state.shelter]);

    return {
        state,
        setUser,
        setShelter,
    };
}
