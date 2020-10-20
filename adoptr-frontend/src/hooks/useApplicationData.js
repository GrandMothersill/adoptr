import { useState, useEffect } from "react";

export default function useApplicationData() {
    //Hook to store the state and update it
    const [state, setState] = useState({
        account: {},
        type: "",
        rejected_animals: []
    });

    const [userMatches, setUserMatches] = useState([])
    //Functions to update state
    const setUser = (user) => setState(prevState => { return { ...prevState, account: user, type: "user", rejected_animals: user.rejected_animals } });
    const setShelter = (shelter) => setState(prevState => { return { ...prevState, account: shelter, type: "shelter", rejected_animals: [] } });
    const logout = () => {
        setState({ account: {}, type: "", rejected_animals: [] });
        localStorage.clear()
    };

    const setRejectedAnimal = (animalID) => setState(prevState => { return { ...prevState, rejected_animals: prevState.rejected_animals.concat(animalID) } })
    const setNewMatch = (animalID) => setUserMatches(prevState => { return [...prevState, animalID] })

    const resetRejectedAnimal = () => setState(prevState => { return { ...prevState, rejected_animals: [] } })


    //Gets the user/shelter information from localstorage each time there is a refresh and set the state at first load)
    useEffect(() => {
        const data = localStorage.getItem("accountObj");
        if (data) {
            const state = JSON.parse(data);
            setState({ ...state });
        }
    }, []);

    useEffect(() => {
        const data = localStorage.getItem("userMatchesObj");
        if (data) {
            const matches = JSON.parse(data);
            setUserMatches([...matches])
        }
    }, []);

    //Stores the user/shelter information in localStorage so that we can use it to set the state again if a refresh happens
    useEffect(() => {
        localStorage.setItem("accountObj", JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        localStorage.setItem("userMatchesObj", JSON.stringify(userMatches));
    }, [userMatches]);

    return {
        state,
        setUser,
        setShelter,
        logout,
        setRejectedAnimal,
        userMatches,
        setNewMatch,
        setUserMatches,
        resetRejectedAnimal
    };
}
