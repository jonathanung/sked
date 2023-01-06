import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import CalendarEditForm from "../calendar/calendarEditForm";

export default function DashboardLinksCalendarFunctions(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [isTrigger, setIsTrigger] = useState(false);
    const ref = useRef(null);

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
    return (
        <div className="dashboard-links-calendar-functions" ref={ref}>
            <Button onClick={handleClick}>Edit</Button>
            < CalendarEditForm deleteCalendar={props.deleteCalendar} calendar = { props.calendar } setLoaded = { props.setLoaded } handleClick = { handleClick } isWide = { props.isWide } show = { show } target = { target } innerRef = { ref } />
        </div>
    )
}