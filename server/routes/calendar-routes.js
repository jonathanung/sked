const CalendarController = require("../controllers/calendar-controller")


module.exports = app =>{
    app.post("/api/calendar/create", CalendarController.createCalendar)
    app.get("/api/calendar/getOne/:id", CalendarController.getOneCalendar)
    app.get("/api/calendar/getUserCalendars", CalendarController.getUserCalendars)
    app.get("/api/calendar/getCalendarEvents/:id", CalendarController.getCalendarEvents)
    app.put("/api/calendar/update/:id",CalendarController.updateCalendar)
    app.delete("/api/calendar/delete/:id",CalendarController.deleteCalendar)
}
