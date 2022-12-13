import React from 'react';
import { Overlay, Popover } from 'react-bootstrap';
/**
 * The form for adding events to the list of events.
 * @param {*} props 
 */
export default function CalendarMonthViewDayForm(props) {
    return (
        <Overlay
        show={props.show}
        target={props.target}
        placement="left"
        container={props.innerRef}
        containerPadding={20}>
        <Popover id="popover-contained">
                <Popover.Header as="h3">
                    Popover bottom <a onClick={props.handleClick}>x</a>
            </Popover.Header>
            <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
            </Popover.Body>
        </Popover>
        </Overlay>
    )
}