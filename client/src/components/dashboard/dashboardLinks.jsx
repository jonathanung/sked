import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {Navbar, Button} from 'react-bootstrap';
import CalendarCreateForm from '../calendar/calendarCreateForm';

/**
 * The set of links and functions on the left side of the dashboard
 * @param {*} props
 * @returns the dashboard links and functions
 */
export default function DashboardLinks(props) {
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [calendars, setCalendars] = useState([])
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const getUserCalendars = () => {
        axios.get("http://localhost:8000/api/calendar/getUserCalendars", { withCredentials: true })
            .then(calendars => setCalendars(calendars.data))
            .catch(err => console.log(err))
    }

    const handleClick = (e) => {
        setShow(!show);
        setTarget(e.target);
    };

    useEffect(() => { 
        if (!loaded) {
            getUserCalendars();
            setLoaded(true);
        }
    }, [loaded])

    return(
            <Navbar className={props.isWide ? "dashboard-links" : "dashboard-links-vert"} bg="secondary" variant="dark">
                <div className={"dashboard-links-bottom"}>
                    <h1>Calendars</h1>
                    <div className={props.isWide ? "dashboard-links-calendars" : "dashboard-links-calendar-vert"}>
                    {calendars ? calendars.map((calendar, i) => {
                        const style = {
                            color: calendar.color
                        }
                        return (
                            <div key={i} className="dashboard-links-calendar-parent">
                                <div className="dashboard-links-calendar-text">
                                    <h5 style={style}>{calendar.name}</h5>
                                    {calendar.description ? <p style={style}>{calendar.description}</p> : null}
                                </div>
                                <div className="dashboard-links-calendar-functions">
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                </div>
                            </div>
                            )
                            }) : null}
                    </div>
                <Button ref={ref} onClick={handleClick}>+Create Calendar!</Button>
            </div>
            <CalendarCreateForm setLoaded={setLoaded} handleClick={handleClick} isWide={props.isWide} show={show} target={target} innerRef={ref}/>
            </Navbar>
        );
}