import React from 'react';

/**
 * The view of the day currently selected in the calendar month view
 * @param {*} props date formatted by dayjs
 * @returns the view of the day
 */
export default function calendarMonthViewDay(props) {
    if (props.month - 1 === props.day.$M) {
        return (
            <div className="calendar-month-view-day">
                <p>{props.day.$D}</p>
            </div>
        )
    } else {
        return ( 
            <div className="calendar-month-view-day">
                <p style={{color: "red"}}>{props.day.$D}</p>
            </div>
        )
    }
}
