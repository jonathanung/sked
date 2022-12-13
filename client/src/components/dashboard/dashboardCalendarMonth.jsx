import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import getCalendarMonthArray from '../../functions/getCalendarMonthArray';
import getAllDayNames from '../../functions/getAllDayNames';
import getMonthName from '../../functions/getMonthName';
import CalendarMonthViewDay from '../calendar/calendarMonthViewDay';

/**
 * The display for the selected calendar month
 * @param {*} props the month and year selected
 * @returns the calendar view
 */
export default function DashboardCalendarMonth(props) {
    const [calendar, setCalendar] = useState(getCalendarMonthArray(props));

    useEffect(() => { 
        setCalendar(getCalendarMonthArray(props));
    }, [props])

    return (
        <div className="calendar-parent">
            <Button onClick={props.prevMonth}>-Month</Button>
            <Button onClick={props.nextMonth}>+Month</Button>
            <Button onClick={props.prevYear}>-Year</Button>
            <Button onClick={props.nextYear}>+Year</Button>
            <h2>{getMonthName(props.month)}, {props.year}</h2>
            <Table className="calendar-month-view" bordered variant="dark" responsive="sm">
                <thead>
                    <tr className="calendar-month-view-week-header">
                        {getAllDayNames().map((day, i) => {
                            return (
                                <th className="calendar-month-view-week-header" key={i}>
                                    {props.isWide ? day : day.substring(0,2)}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody> 
                    {calendar.map((week, i) => {
                        return (
                            <tr className="calendar-month-view-week" key={i}>
                                {week.map((day, j) => {
                                    return (
                                        <CalendarMonthViewDay month={props.month} day={day} key={i + j} />
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}