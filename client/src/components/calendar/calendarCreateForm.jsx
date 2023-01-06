import React, { useState } from 'react';
import axios from 'axios';
import { Overlay, Popover, Button, Form, FormGroup } from 'react-bootstrap';
import getSupportedColors from '../../functions/getSupportedColors';
/**
 * The form for adding calendars to the list of calendars.
 * @param {*} props
 */
export default function CalendarCreateForm(props) {
    
    const colors = getSupportedColors()

    const placementDict = {
        true: "right",
        false: "bottom"
    }

    const initFormState = {
        name: '',
        description: '',
        color: colors[0],
    }
    const [calendarData, setCalendarData] = useState(initFormState);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setCalendarData(calendarData => { return ({ ...calendarData, [name]: value }) });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCalendarData(calendarData => { return ({ ...calendarData }) })
        axios.post("http://localhost:8000/api/calendar/create", calendarData, {withCredentials: true})
            .then(res => props.setLoaded(false))
            .catch(err => console.log(err))
        setCalendarData(initFormState)
    }

    return (
        <Overlay
            show={props.show}
            target={props.target}
            placement={placementDict[props.isWide]}
            container={props.innerRef}
            containerPadding={20}>
            <Popover id="popover-contained">
                <Popover.Header className="view-month-form-header" style={{color:"black"}}>
                    <h6 className="view-month-form-header-text"> Create a new calendar! </h6>
                    <Button onClick={props.handleClick} size="sm">x</Button>
                </Popover.Header>
                <Popover.Body>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label htmlFor="name">Name</label>
                            <input value={calendarData.name || ''} type="text" name="name" id="name" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="description">Description</label>
                            <input value={calendarData.description || ''} type="text" name="description" id="description" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="color">Color</label>
                            <Form.Select value={calendarData.color} name="color" id="color" onChange={handleChange}>
                                {colors.map((color, i) => {
                                    return (
                                        <option value={color} key={i}>{color}</option>
                                    )
                                })}
                            </Form.Select>
                        </FormGroup>
                        <FormGroup>
                            <Button size="sm" type="submit" onClick={props.handleClick}>Create Calendar!</Button>
                        </FormGroup>
                    </Form>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}