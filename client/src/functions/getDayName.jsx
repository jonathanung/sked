/**
 * @param {*} day 
 * @returns name of the day
 */
export default function getDayName(day) {
    const dayDict = {
        1: "Sunday",
        2: "Monday",
        3: "Tuesday",
        4: "Wednesday",
        5: "Thursday",
        6: "Friday",
        7: "Saturday"
    }
    return dayDict[day];
}
