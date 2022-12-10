import { useState, useEffect } from 'react';

/**
 * Gets the current window dimensions of the application
 * @returns window dimensions
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

/**
 * Gets the current window dimensions of the application via the getWindowDimensions() method and listens for window resize events
 * @returns window dimensions
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
} 

/*
Source: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
*/