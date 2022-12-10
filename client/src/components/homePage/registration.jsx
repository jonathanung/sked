import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import axios from 'axios';

export default function Register(props) {

    const initFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [user, setUser] = useState(initFormState);
    const [visible, setVisible] = useState(false);
    let [errors, setErrors] = useState("")
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
        axios.post("http://localhost:8000/api/user/register", user, {withCredentials: true})
            .then(res => {
                res.data.errors ? console.log(res.data.errors) : navigate("/dashboard")
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="register-form">
            <h2>(sked.) register.</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" name="firstName" id="firstName" value={user.firstName || ''} onChange={handleChange} autoComplete="firstName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input type="text" name="lastName" id="lastName" value={user.lastName || ''} onChange={handleChange} autoComplete="lastName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" value={user.email || ''} onChange={handleChange} autoComplete="email"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label> 
                    <div className="password-with-show">
                        <Input type={passDict[visible][0]} name="password" id="password" value={user.password || ''} onChange={handleChange} autoComplete="password"/> 
                        <Button color="secondary" onClick={showPass} size="sm">{passDict[visible][1]}</Button>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm password</Label>
                    <Input type={passDict[visible][0]} name="confirmPassword" id="confirmPassword" value={user.confirmPassword|| ''} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Register</Button>
                </FormGroup>
            </Form>

            <p>Already have an account? <Button onClick={props.swapReg}>Login here!</Button></p>
        </div>
    )
}