import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import CalendarMonthViewEventEditForm from './calendarMonthViewEventEditForm';
import dayjs from 'dayjs';
import { AccordionCollapse } from 'react-bootstrap';

/**
 * The view of the day currently selected in the calendar month view
 * @param {*} props date formatted by dayjs
 * @returns the view of the day
 */
export default function CalendarMonthViewEvent(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [isTrigger, setIsTrigger] = useState(false);
    const [color, setColor] = useState('White');
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

    const formatTime = (n) => {
        if (n < 9) {
            return ("0" + n.toString());
        } else {
            return (n.toString());
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        handleClick(e);
        axios.delete(`http://localhost:8000/api/event/delete/${props.event._id}`, {withCredentials: true})
            .then(res => props.setLoaded(false))
            .catch(err => console.log(err))
    }

    if (props.event.calendar) {
        axios.get(`http://localhost:8000/api/calendar/getOne/${props.event.calendar}`, { withCredentials: true })
            .then(calendar => setColor(calendar.data.color))
            .catch(err => console.log(err))
    }

    return (
        <td className="calendar-month-view-day-cell" ref={ref} >
            <a onClick={handleClick} style={{ color: color }}>{props.event.name} @ {formatTime(dayjs(props.event.startTime).$d.getHours())}:{formatTime(dayjs(props.event.startTime).$d.getMinutes())} - {formatTime(dayjs(props.event.endTime).$d.getHours())}:{formatTime(dayjs(props.event.endTime).$d.getMinutes())}</a>
            {props.event.expense !== 0 ? <p style={{ color: color }}>Expense: ${props.event.expense}</p> : null}
            <CalendarMonthViewEventEditForm userCalendars={props.userCalendars} event={props.event} setLoaded={props.setLoaded} isWide={props.isWide}  year={props.year} month={props.month} day={props.day} handleClick={handleClick} handleDelete={handleDelete} show={show} target={target} innerRef={ref}/> 
        </td>

    )
}