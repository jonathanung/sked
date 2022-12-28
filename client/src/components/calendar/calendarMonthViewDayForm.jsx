import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Overlay, Popover, Button, Form, FormGroup } from 'react-bootstrap';
import getMonthName from '../../functions/getMonthName';
/**
 * The form for adding events to the list of events.
 * @param {*} props 
 */
export default function CalendarMonthViewDayForm(props) {
    const placementDict = {
        true: "left",
        false: "top"
    }
    const getNumFormat = (month) => {
        if (month > 9) {
            return month.toString();
        } else {
            return "0" + month.toString();
        }
    }

    const initFormState = {
        name: '',
        startTime: props.year.toString() + "-" + getNumFormat(props.month) + "-" + getNumFormat(props.day.$D) + "T00:00",
        endTime: props.year.toString() + "-" + getNumFormat(props.month) + "-" + getNumFormat(props.day.$D) + "T12:00",
        description: '',
        location: ''
    }
    const [eventData, setEventData] = useState(initFormState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEventData(eventData => { return ({ ...eventData, [name]: value }) });
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        setEventData(eventData => { return ({ ...eventData, startTime: new Date(eventData.startTime), endTime: new Date(eventData.endTime) }) })
        axios.post("http://localhost:8000/api/event/create", eventData, {withCredentials: true})
            .then(res => props.setLoaded(false))
            .catch(err => console.log(err))
    }

    useEffect(() => { 
        setEventData(initFormState)
    }, [props.month, props.year, props.day])
    
    return (
        <Overlay
        show={props.show}
        target={props.target}
        placement={placementDict[props.isWide]}
        container={props.innerRef}
        containerPadding={20}>
            <Popover id="popover-contained">
                <Popover.Header className="view-month-form-header" style={{color:  "black"}}>
                        <h6 className="view-month-form-header-text"> Add an event to {getMonthName(props.day.$M + 1)} {props.day.$D}, {props.year}</h6>
                        <Button onClick={props.handleClick} size="sm">x</Button>
                </Popover.Header>
                <Popover.Body>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label htmlFor="name">Name</label>
                            <input value={eventData.name || ''} type="text" name="name" id="name" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="description">Description</label>
                            <input value={eventData.description || ''} type="text" name="description" id="description" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="location">Location</label>
                            <input value={eventData.location || ''} type="text" name="location" id="location" onChange={handleChange} />
                        </FormGroup>
                        
                        <FormGroup>
                            <label htmlFor="startTime">Event Start:</label>
                            <input value={eventData.startTime || initFormState.startTime} type="datetime-local" id="startTime" name="startTime" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="endTime">Event End:</label>
                            <input value={eventData.endTime || initFormState.endTime} type="datetime-local" id="endTime" name="endTime" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button size="sm" type="submit" onClick={props.handleClick}>Create Event!</Button>
                        </FormGroup>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}