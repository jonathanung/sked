import dayjs from 'dayjs';

/**
 * This function creates a new 2d array of days based on the year and month provided in props in the shape of a calendar
 * @param {*} props the year and month of the calendar
 * @returns daysMat -> the calendar 2d array
 */
export default function getCalendarMonthArray(props) {
    const monthLen = {
        28: [2],
        29: [2],
        30: [4, 6, 9, 11],
        31: [1, 3, 5, 7, 8, 10, 12]
    }

    const getIsLeapYear = (year) => {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return true;
        }
        return false;
    }
    const firstDayOfMonth = dayjs(new Date(props.year, props.month - 1)).day()
    let arrSize = 5;
    if (((firstDayOfMonth >= 5 && monthLen[31].includes(props.month)) || (firstDayOfMonth === 6 && monthLen[30].includes(props.month)))) {
        arrSize = 6;
    } else if (firstDayOfMonth === 0 && props.month === 2) {
        const isLeapYear = getIsLeapYear(props.year);
        if (!isLeapYear) {
            arrSize = 4;
        }
    }
    let curr = 0 - firstDayOfMonth;
    const daysMat = new Array(arrSize).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            curr++;
            return dayjs(new Date(props.year, props.month-1, curr));
        })
    })
    return daysMat;
}