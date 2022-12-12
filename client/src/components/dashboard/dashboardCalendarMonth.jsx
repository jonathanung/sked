import React, { useState, useEffect } from 'react';
import getMonth from '../../functions/getMonth';
import getAllDayNames from '../../functions/getAllDayNames';
import getMonthName from '../../functions/getMonthName';
import CalendarMonthViewDay from '../calendar/calendarMonthViewDay';

/**
 * The display for the selected calendar month
 * @param {*} props the month and year selected
 * @returns the calendar view
 */
export default function DashboardCalendarMonth(props) {
    const [calendar, setCalendar] = useState(getMonth(props));

    useEffect(() => { 
        setCalendar(getMonth(props));
    }, [props])

    return (
        <div className="calendar-month-view">
            <h2>{getMonthName(props.month)}, {props.year}</h2>
            <div className="calendar-month-view-week-header">
                {getAllDayNames().map((day, i) => {
                    return (
                        <div className="calendar-month-view-day-header" key={i}>
                            {day}
                        </div>
                    )
                })}
            </div>
            {calendar.map((week, i) => {
                return (
                    <div className="calendar-month-view-week" key={i}>
                        {week.map((day, j) => {
                            return (
                                <CalendarMonthViewDay month={props.month} day={day} key={i + j} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}