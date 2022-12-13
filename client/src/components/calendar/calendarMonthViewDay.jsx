import React, {useState, useRef} from 'react';
import { Table } from 'react-bootstrap';
import CalendarMonthViewDayForm from './calendarMonthViewDayForm';

/**
 * The view of the day currently selected in the calendar month view
 * @param {*} props date formatted by dayjs
 * @returns the view of the day
 */
export default function CalendarMonthViewDay(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    
    return (
        <td className="calendar-month-view-day" ref={ref}>
            <Table variant="dark" borderless striped size="sm">
                <thead>
                    <tr className="calendar-month-view-day-header-row">
                        {props.month - 1 === props.day.$M ? <th className="calendar-month-view-day-header-cell">{props.day.$D}</th> : <th className="calendar-month-view-day-header-cell" style={{ color: "red" }}>{props.day.$D}</th>}
                    </tr>
                </thead>
                <tbody className="calendar-month-view-day-body" onClick={handleClick}>
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
                        <td className="calendar-month-view-day-cell">example event @ 10AM</td>
                    </tr>
                </tbody>
            </Table>
            <CalendarMonthViewDayForm handleClick={handleClick} show={show} target={target} innerRef={ref}/> 
        </td>

    )
}
