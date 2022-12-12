import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Navbar, Nav, Container } from 'react-bootstrap';

/**
 * The set of links and functions on the left side of the dashboard
 * @param {*} props 
 * @returns the dashboard links and functions
 */
export default function DashboardLinks(props) {
    return(
            <Navbar className="dashboard-links" bg="secondary" variant="dark">
                Currently a placeholder, work in progress!
            </Navbar>
        );
}