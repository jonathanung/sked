import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Badge } from 'react-bootstrap';
import axios from 'axios';

/**
 * The registration component for the application
 * @returns the registration component
 */
export default function Register(props) {
    const initFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const initValidState = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    };
    const [user, setUser] = useState(initFormState);
    const [valid, setValid] = useState(initValidState);
    const [isValid, setIsValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState("")
    const navigate = useNavigate();

    const passDict = {
        true: ['text', 'Hide Password!'],
        false: ['password', 'Show Password!']
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,}$/;

    const validate = (type, val) => {
        if (type === "firstName" || type === "lastName") {
            val.length === 0 ? setValid({ ...valid, [type]: false }) : setValid({ ...valid, [type]: true });
        } else if (type === "email") {
            emailRegex.test(val) && val.length > 0 ? setValid({ ...valid, [type]: true }) : setValid({ ...valid, [type]: false });
        } else if (type === "password") {
            passRegex.test(val) && val.length > 0 ? setValid(valid => { return { ...valid, [type]: true }; }) : setValid(valid => { return { ...valid, [type]: false }; });
            val === user.confirmPassword ? setValid(valid => { return { ...valid, ["confirmPassword"]: true }; }) : setValid(valid => { return { ...valid, ["confirmPassword"]: false }; });
        } else if (type === "confirmPassword") {
            val === user.password ? setValid(valid => { return { ...valid, [type]: true }; }) : setValid(valid => { return { ...valid, [type]: false }; });
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({ ...user, [name]: value });
        validate(name, value);
    }

    const showPass = (e) => {
        visible ? setVisible(false) : setVisible(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/register", user, {withCredentials: true})
            .then(res => {
                res.data.errors ? setErrors(res.data.errors) : navigate("/dashboard")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        valid.firstName && valid.lastName && valid.email && valid.password && valid.confirmPassword ? setIsValid(true) : setIsValid(false);
    }, [valid, errors])

    return(
        <div className="register-form">
            <h2>(sked.) register.</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="firstName">First name</Label>
                    <Input type="text" name="firstName" id="firstName" value={user.firstName || ''} onChange={handleChange} autoComplete="firstName" />
                    {valid.firstName === false? <Badge className="error" bg="warning">First name is required!</Badge>: null}
                    {errors.firstName && valid.firstName? <Badge className="error" bg="danger">{errors.firstName.message}</Badge>: null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input type="text" name="lastName" id="lastName" value={user.lastName || ''} onChange={handleChange} autoComplete="lastName" />
                    {valid.lastName === false? <Badge className="error" bg="warning">Last name is required!</Badge>: null}
                    {errors.lastName && valid.lastName ? <Badge className="error" bg="danger">{errors.lastName.message}</Badge> : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" value={user.email || ''} onChange={handleChange} autoComplete="email" />
                    {valid.email === false? <Badge className="error" bg="warning">A valid email is required!</Badge>: null}
                    {errors.email && valid.email ? <Badge className="error" bg="danger">{errors.email.message}</Badge> : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label> 
                    <div className="password-with-show">
                        <Input type={passDict[visible][0]} name="password" id="password" value={user.password || ''} onChange={handleChange} autoComplete="password"/> 
                        <Button color="secondary" onClick={showPass} size="sm">{passDict[visible][1]}</Button>
                    </div>
                    {valid.password === false
                        ? <Badge className="error" bg="warning">Passwords must be at least 8 characters long and have an uppercase letter, a lowercase letter, a number and a symbol.</Badge>
                        : <Badge className="default" bg="secondary">Passwords must be at least 8 characters long and have an uppercase letter, a lowercase letter, a number and a symbol.</Badge>}
                    {errors.password && valid.password ? <Badge className="error" bg="danger">{errors.password.message}</Badge> : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input type={passDict[visible][0]} name="confirmPassword" id="confirmPassword" value={user.confirmPassword || ''} onChange={handleChange} />
                    {valid.confirmPassword === false? <Badge className="error" bg="warning">The passwords must match!</Badge>: null}
                    {errors.confirmPassword && valid.confirmPassword ? <Badge className="error" bg="danger">{errors.confirmPassword.message}</Badge> : null}
                </FormGroup>
                <FormGroup>
                    {isValid ? <Button color="primary" type="submit">Register</Button> : <Button color="secondary" disabled>Register</Button>}
                </FormGroup>
            </Form>

            <p>Already have an account? <Button onClick={props.swapReg}>Login here!</Button></p>
        </div>
    )
}