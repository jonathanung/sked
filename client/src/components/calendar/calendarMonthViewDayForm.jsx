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
    const [value, onChange] = useState('10:00');

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
                            <label for="birthdaytime">Birthday (date and time):</label>
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
                        </FormGroup>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}