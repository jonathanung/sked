import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from "../components/application/navigation";

/**
 * The dashboard screen of the application, where the logged in user can interact
 * @returns The dashboard screen, or navigates to homepage if no user is logged in
 */
export default function Dashboard() {
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/current", { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(err => navigate("/"))
    }, [])

    return(
        <div className="dashboard">
            <Navigation loggedIn={true}/>
        </div>
    )
}