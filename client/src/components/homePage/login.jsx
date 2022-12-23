import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import axios from "axios";

/**
 * The login form for the application
 * @returns the login component
 */
export default function Login(props){
    const initFormState = {
        email: '',
        password : ''
    };
    const [user, setUser] = useState(initFormState);
    const [visible, setVisible] = useState(false);
    const [valid, setValid] = useState(true)
    const navigate = useNavigate();

    const passDict = {
        true: ['text', 'Hide Password!'],
        false: ['password', 'Show Password!']
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value });
    }

    const showPass = (e) => {
        visible ? setVisible(false) : setVisible(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', user, { withCredentials: true })
            .then(res => navigate('/dashboard'))
            .catch(err => setValid(false), setUser(initFormState))
    }

    return(
        <div className="login-form">
            <h2>(sked.) login.</h2>
            <Form onSubmit={handleSubmit}>
                {!valid? <Badge bg="danger">Username or password incorrect!</Badge>: null}
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" value={user.email || ''} onChange={handleChange} autoComplete="email"/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <div className="password-with-show">
                        <Input type={passDict[visible][0]} name="password" id="password" value={user.password || ''} onChange={handleChange} autoComplete="password"/> 
                        <Button color="secondary" onClick={showPass} size="sm">{passDict[visible][1]}</Button>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Login</Button>
                </FormGroup>
            </Form>

            <p>Don't have an account? <Button onClick={props.swapReg}>Register here!</Button></p>
        </div>
    )
}