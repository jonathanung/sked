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
    const [user, setUser] = useState(null)
    const [hasFormDisplay, setHasFormDisplay] = useState(false);
    const [userCalendars, setUserCalendars] = useState(null)
    const [eventsArray, setEventsArray] = useState(null)
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    const isWide = height * 1.3 < width;

    const getAPIs = async () => {
        setLoaded(true);
        getUser()
        getUserEvents()
        getUserCalendars()
    }

    const getUser = () => {
        axios.get("http://localhost:8000/api/user/current", { withCredentials: true })
            .then(user => setUserAPI(user.data))
            .catch(err => navigate("/"))
        
    }
    
    const getUserEvents = () => {
        axios.get("http://localhost:8000/api/event/getUserEvents", { withCredentials: true })
            .then(events => setEventsArray(events.data))
            .catch(err => console.log(err))
        
    }
    
    const getUserCalendars = () => {
        axios.get("http://localhost:8000/api/calendar/getUserCalendars", { withCredentials: true })
            .then(calendars => setUserCalendars(calendars.data))
            .catch(err => console.log(err))
        
    }

    const setUserAPI = (userData) => {
        setUser(userData);
        setLoaded(true);
    }

    const contentDict = {
        true: "dashboard-content",
        false: "dashboard-content-vert"
    }


    useEffect(() => {
        if (!loaded) {
            getAPIs();
        }
        if (user !== null) {
            document.title = user.firstName.toLowerCase() + "'s sked." 
        }
        
    }, [loaded, user])

    return(
        <div className="dashboard">
            <Navigation loggedIn={true} user={user} />
            <div className={contentDict[isWide]}>
                <DashboardLinks hasFormDisplay={hasFormDisplay} setHasFormDisplay={setHasFormDisplay} userCalendars={userCalendars} loaded={loaded} setLoaded={setLoaded} user={user} isWide={isWide} />
                <DashboardControllerMonth hasFormDisplay={hasFormDisplay} setHasFormDisplay={setHasFormDisplay} userCalendars={userCalendars} eventsArray={eventsArray} loaded={loaded} setLoaded={setLoaded} user={user} isWide={isWide} />
            </div>
        </div>
    )
}