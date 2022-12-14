import React, {useState} from "react";
import dayjs from 'dayjs';
import DashboardCalendarMonth from "./dashboardCalendarMonth";
import { Button } from "react-bootstrap";

/**
 * The controller for the DashboardCalendarMonth function with all of the operating components and values
 * @param {*} props 
 * @returns the DashboardControllerMonth
 */
export default function DashboardControllerMonth(props) {
    const [month, setMonth] = useState(dayjs().month()+1)
    const [year, setYear] = useState(dayjs().year())

    const nextMonth = () => {
        if (month === 12) {
            setMonth( () => {
                return (1);
            });
            setYear(year => {
                return (year+1);
            });
        } else {
            setMonth(month => {
                return (month+1);
            });
        }
    }

    const prevMonth = () => {
        if (month === 1) {
            setMonth(month => {
                return (12);
            });
            setYear(year => {
                return (year-1);
            });
        } else {
            setMonth(month => {
                return (month-1);
            });
        }
    }

    const nextYear = () => { setYear(year => { return (year+1); } )}
    const prevYear = () => { setYear(year => { return (year-1); } )}

    return (
        <div className="dashboard-controller">
            <DashboardCalendarMonth month={month} year={year} prevMonth={prevMonth} nextMonth={nextMonth} prevYear={prevYear} nextYear={nextYear} isWide={props.isWide} />
        </div>
    )
}