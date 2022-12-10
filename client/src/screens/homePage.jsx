import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/application/navigation'
import Description from "../components/homePage/description";
import Login from "../components/homePage/login";
import Register from "../components/homePage/registration";
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function HomePage() {
    const [reg, setReg] = useState(false);
    const { height, width } = useWindowDimensions();
    const swapReg = () => {
        !reg ? setReg(true) : setReg(false);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/logout", {withCredentials: true})
            .then(res => console.log("logged out!"))
            .catch(err => console.log(err));
    }, [])

    if (height*1.3 > width) { 
        if (!reg) {
            return (
                <div className="home-page">
                    <Navigation loggedIn={false} />
                    <div className="home-page-tiles-vert">
                        <Description />
                        <Login swapReg={swapReg} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="home-page">
                    <Navigation loggedIn={false} />
                    <div className="home-page-tiles-vert">
                        <Description />
                        <Register swapReg={swapReg} />
                    </div>
                </div>
            )
        }
    } else {
        if (!reg) {
            return (
                <div className="home-page">
                    <Navigation loggedIn={false} />
                    <div className="home-page-tiles">
                        <Description />
                        <Login swapReg={swapReg} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="home-page">
                    <Navigation loggedIn={false} />
                    <div className="home-page-tiles">
                        <Description />
                        <Register swapReg={swapReg} />
                    </div>
                </div>
            )
        }
    }
}
