import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/application/navigation'
import Description from "../components/homePage/description";
import Login from "../components/homePage/login";
import Register from "../components/homePage/registration";
import useWindowDimensions from '../hooks/useWindowDimensions';

/**
 * The home page screen, where the user can see the description and the login and registration pages
 * @returns The homePage screen
 */
export default function HomePage() {
    const [reg, setReg] = useState(false);
    const { height, width } = useWindowDimensions();
    const isWide = height*1.3 < width;
    const swapReg = () => {
        !reg ? setReg(true) : setReg(false);
    }

    const tilesDict = {
        true: "home-page-tiles",
        false: "home-page-tiles-vert"
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => console.log("logged out!"))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="home-page">
            <Navigation loggedIn={false} />
            <div className={tilesDict[isWide]}>
                <Description />
                {reg ? <Register swapReg={swapReg} /> : <Login swapReg={swapReg} />}
            </div>
        </div>
    )
}
