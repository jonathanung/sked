import React, {useState} from 'react';
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
        startTime: '',
        endTime: '',
        description: '',
        location: ''
    }
    const [event, setEvent] = useState(initFormState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEvent({ ...event, [name]: value });
    }
    
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
                    <Form>
                        <FormGroup>
                            <label for="startTime">Event Start:</label>
                            <input value={props.year.toString() + "-" + getNumFormat(props.month) + "-" + getNumFormat(props.day.$D) + "T00:00"} type="datetime-local" id="startTime" name="startTime"/>
                        </FormGroup>
                        <FormGroup>
                            <label for="endTime">Event End:</label>
                            <input value={props.year.toString() + "-" + getNumFormat(props.month) + "-" + getNumFormat(props.day.$D) + "T12:00"} type="datetime-local" id="endTime" name="endTime"/>
                        </FormGroup>
                        <FormGroup>
                            <Button size="sm">Create Event!</Button>
                        </FormGroup>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}