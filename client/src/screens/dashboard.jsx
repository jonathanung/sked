import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from "../components/application/navigation";
import DashboardLinks from '../components/dashboard/dashboardLinks';
import DashboardControllerMonth from '../components/dashboard/dashboardControllerMonth';
import useWindowDimensions from '../hooks/useWindowDimensions';

/**
 * The dashboard screen of the application, where the logged in user can interact
 * @returns The dashboard screen, or navigates to homepage if no user is logged in
 */
export default function Dashboard() {
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    const isWide = height*1.3 < width;

    const setUserAPI = (userData) => {
        setUser(userData);
        setLoaded(true);
    }

    const contentDict = {
        true: "dashboard-content",
        false: "dashboard-content-vert"
    }


    useEffect(() => {
        loaded
            ? document.title = user.firstName.toLowerCase() + "'s " + "sked."
            : axios.get("http://localhost:8000/api/user/current", { withCredentials: true })
                .then(res => setUserAPI(res.data))
                .catch(err => navigate("/"))
        // console.log(user)
    }, [loaded])

    return(
        <div className="dashboard">
            <Navigation loggedIn={true} user={user} />
            <div className={contentDict[isWide]}>
                <DashboardLinks user={user} isWide={isWide} />
                <DashboardControllerMonth user={user} isWide={isWide} />
            </div>
        </div>
    )
}