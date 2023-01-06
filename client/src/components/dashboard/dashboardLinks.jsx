import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {Navbar, Button} from 'react-bootstrap';
import CalendarCreateForm from '../calendar/calendarCreateForm';
import DashboardLinksCalendarFunctions from "./dashboardLinksCalendarFunctions";

/**
 * The set of links and functions on the left side of the dashboard
 * @param {*} props
 * @returns the dashboard links and functions
 */
export default function DashboardLinks(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [isTrigger, setIsTrigger] = useState(false);
    const ref = useRef(null);

    const deleteCalendar = (calendar) => {
        axios.delete(`http://localhost:8000/api/calendar/delete/${calendar._id}`, { withCredentials: true })
            .then(res => props.setLoaded(false))
            .catch(err => console.log(err))
    }

    const handleClick = (e) => {
        if (props.hasFormDisplay === false) {
            setShow(true);
            props.setHasFormDisplay(true);
            setTarget(e.target);
        } else if (props.hasFormDisplay === true && show === true) {
            setShow(false);
            props.setHasFormDisplay(false);
        } else {
            setIsTrigger(e);
            props.setHasFormDisplay(() => { return false; });
        }
    };

    useEffect(() => {
        if (props.hasFormDisplay === false && show === true) {
            setShow(false)
        }
        if (isTrigger) {
            setShow(true);
            props.setHasFormDisplay(true);
            setTarget(isTrigger.target);
            setIsTrigger(false);
        }
    }, [props.hasFormDisplay])

    return(
            <Navbar className={props.isWide ? "dashboard-links" : "dashboard-links-vert"} bg="secondary" variant="dark">
                <div className={"dashboard-links-bottom"} ref={ref}>
                    <h1>Calendars</h1>
                    <div className={props.isWide ? "dashboard-links-calendars" : "dashboard-links-calendar-vert"}>
                    {props.userCalendars ? props.userCalendars.map((calendar, i) => {
                        const style = {
                            color: calendar.color
                        }
                        return (
                            <div key={i} className="dashboard-links-calendar-parent" ref={ref}>
                                <div className="dashboard-links-calendar-text">
                                    <h5 style={style}>{calendar.name}</h5>
                                    {calendar.description ? <p style={style}>{calendar.description}</p> : null}
                                </div>
                                <DashboardLinksCalendarFunctions hasFormDisplay={props.hasFormDisplay} setHasFormDisplay={props.setHasFormDisplay} deleteCalendar={deleteCalendar} calendar={calendar} setLoaded={props.setLoaded} isWide={props.isWide}/>
                            </div>
                            
                            )
                            }) : <p>You have no calendars!</p>}
                    </div>
                <Button onClick={handleClick}>+Create Calendar!</Button>
                <CalendarCreateForm setLoaded={props.setLoaded} handleClick={handleClick} isWide={props.isWide} show={show} target={target} innerRef={ref}/>
                </div>
            </Navbar>
        );
}