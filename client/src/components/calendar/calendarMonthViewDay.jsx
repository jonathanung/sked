import React, {useState, useRef, useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import CalendarMonthViewDayForm from './calendarMonthViewDayForm';
import dayjs from 'dayjs';

/**
 * The view of the day currently selected in the calendar month view
 * @param {*} props date formatted by dayjs
 * @returns the view of the day
 */
export default function CalendarMonthViewDay(props) {
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

    const formatTime = (n) => {
        if (n < 9) {
            return ("0" + n.toString());
        } else {
            return (n.toString());
        }
    }

    return (
        <td className="calendar-month-view-day" ref={ref}>
            <Table variant="dark" borderless striped size="sm">
                <thead>
                    <tr className="calendar-month-view-day-header-row">
                        {props.month - 1 === props.day.$M ? <th className="calendar-month-view-day-header-cell">{props.day.$D}</th> : <th className="calendar-month-view-day-header-cell" style={{ color: "red" }}>{props.day.$D}</th>}
                    </tr>
                </thead>
                <tbody className="calendar-month-view-day-body">
                    {props.events ? props.events.map((event, i) => {
                        return (
                            <tr key={i} className="calendar-month-view-day-row">
                                <td className="calendar-month-view-day-cell">{event.name} @ {formatTime(dayjs(event.startTime).$d.getHours())}:{formatTime(dayjs(event.startTime).$d.getMinutes())}</td>
                            </tr>
                        )
                    }) : null }
                    {props.day.$M+1 === props.month ? <tr className="calendar-month-view-day-row">
                        <td><Button onClick={handleClick} size="sm" className="add-event-month">+Add Event</Button></td>
                    </tr> : null}
                </tbody>
            </Table>
            <CalendarMonthViewDayForm setLoaded={props.setLoaded} isWide={props.isWide}  year={props.year} month={props.month} day={props.day} handleClick={handleClick} show={show} target={target} innerRef={ref}/> 
        </td>

    )
}