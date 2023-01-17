import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email:"", password:"", cpassword:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='mt-2'>
            <h2 className='my-2'>Create account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" name="name">Name</label>
                        <input type="text" className="form-control" onChange={onChange} name="name" id="name" />
                    </div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="email" />
                    <div id="email" name="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" name="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label" name="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form></div>
    )
}

export default Signup