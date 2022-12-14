import React, {useState, useRef, useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import CalendarMonthViewDayForm from './calendarMonthViewDayForm';

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
        if ( props.hasFormDisplay === false && show === true ){
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
        <td className="calendar-month-view-day" ref={ref}>
            <Table variant="dark" borderless striped size="sm">
                <thead>
                    <tr className="calendar-month-view-day-header-row">
                        {props.month - 1 === props.day.$M ? <th className="calendar-month-view-day-header-cell">{props.day.$D}</th> : <th className="calendar-month-view-day-header-cell" style={{ color: "red" }}>{props.day.$D}</th>}
                    </tr>
                </thead>
                <tbody className="calendar-month-view-day-body">
                    <tr className="calendar-month-view-day-row">
                        <td className="calendar-month-view-day-cell">example event @ 10AM</td>
                    </tr>
                    <tr className="calendar-month-view-day-row">
                        <td className="calendar-month-view-day-cell">example event @ 10AM</td>
                    </tr>
                    <tr className="calendar-month-view-day-row">
                        <td className="calendar-month-view-day-cell">example event @ 10AM</td>
                    </tr>
                    <tr className="calendar-month-view-day-row">
                        <td><Button onClick={handleClick} size="sm" className="add-event-month">+Add Event</Button></td>
                    </tr>
                </tbody>
            </Table>
            <CalendarMonthViewDayForm isWide={props.isWide}  year={props.year} month={props.month} day={props.day} handleClick={handleClick} show={show} target={target} innerRef={ref}/> 
        </td>

    )
}