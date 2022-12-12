import dayjs from 'dayjs';

/**
 * This function creates a new 2d array of days based on the year and month provided in props in the shape of a calendar
 * @param {*} props the year and month of the calendar
 * @returns daysMat -> the calendar 2d array
 */
export default function getMonth(props) {
    const firstDayOfMonth = dayjs(new Date(props.year, props.month-1)).day()
    let curr = 0 - firstDayOfMonth;
    const daysMat = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            curr++;
            return dayjs(new Date(props.year, props.month-1, curr));
        })
    })
    return daysMat;
}