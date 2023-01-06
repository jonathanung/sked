const EventController = require("../controllers/event-controller")


module.exports = app =>{
    app.post("/api/event/create",EventController.createEvent)
    app.get("/api/event/getUserEvents", EventController.getUserEvents)
    app.get("/api/event/getEventCalendar/:id", EventController.getEventCalendar)
    app.put("/api/event/update/:id",EventController.updateEvent)
    app.delete("/api/event/delete/:id",EventController.deleteEvent)
}
