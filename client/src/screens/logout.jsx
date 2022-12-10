import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/application/navigation'

/**
 * The logout screen which the user gets after logging out of the application
 * @returns The logout screen
 */
export default function Logout() {
    const [counter, setCounter] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (counter === 3) {
            axios.get("http://localhost:8000/api/user/logout", { withCredentials: true })
                .then(res => console.log("Logged out!"))
                .catch(err => console.log(err))
        }
        if (counter === 0) navigate("/")
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter])

    return (
        <div className="logged-out">
            <Navigation loggedIn={false} />
            <div className="logged-out-cont">
                <h1>You have been logged out. Returning to login page in {counter} seconds...</h1>
            </div>
        </div>
    )
}