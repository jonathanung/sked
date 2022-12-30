import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import getCalendarMonthArray from '../../functions/getCalendarMonthArray';
import getAllDayNames from '../../functions/getAllDayNames';
import getMonthName from '../../functions/getMonthName';
import CalendarMonthViewDay from '../calendar/calendarMonthViewDay';
import axios from 'axios';
import dayjs from 'dayjs';

/**
 * The display for the selected calendar month
 * @param {*} props the month and year selected
 * @returns the calendar view
 */
export default function DashboardCalendarMonth(props) {
    const [calendar, setCalendar] = useState(getCalendarMonthArray(props));
    const [hasFormDisplay, setHasFormDisplay] = useState(false);
    const [userEvents, setUserEvents] = useState({})
    const [expenseTotal, setExpenseTotal] = useState(0);

    const getUserEvents = () => {
        axios.get("http://localhost:8000/api/event/getUserEvents", { withCredentials: true })
            .then(events => sortUserEvents(events.data))
            .catch(err => console.log(err))
    }

    const sortUserEvents = (eventsArray) => {
        setExpenseTotal(() => { return (0) });
        const sortedEvents = {};
        for (const event of eventsArray) {
            const fEvent = dayjs(event.startTime)
            if (fEvent.$M + 1 === props.month && fEvent.$y === props.year) {
                if (event.expense) setExpenseTotal(expenseTotal => { return (expenseTotal + event.expense) });
                if (sortedEvents[fEvent.$D] === undefined) {
                    sortedEvents[fEvent.$D] = [event]
                } else {
                    sortedEvents[fEvent.$D] = [...sortedEvents[fEvent.$D], event]
                }
            }
        }
        setUserEvents(sortedEvents);
    }


    useEffect(() => { 
        setCalendar(getCalendarMonthArray(props));
        if (!props.loaded) {
            setExpenseTotal(() => {return(0)});
            getUserEvents();
            props.setLoaded(true);
        }
    }, [props])

    return (
        <div className="calendar-parent">
            <div className="button-change-holder">
                <Button onClick={props.prevMonth}>-Month</Button>
                <Button onClick={props.nextMonth}>+Month</Button>
                <Button onClick={props.prevYear}>-Year</Button>
                <Button onClick={props.nextYear}>+Year</Button>
            </div>
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
                                        <CalendarMonthViewDay setLoaded={props.setLoaded} events={day.$M+1 === props.month ? userEvents[day.$D]: null} hasFormDisplay={hasFormDisplay} setHasFormDisplay={setHasFormDisplay} isWide={props.isWide} year={props.year} month={props.month} day={day} key={i + j} />
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <p>Expenses this month: {expenseTotal}</p>
        </div>
    )
}