import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("logged in successfully", "success");
            navigate('/');

        }
        else {
            props.showAlert("invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }




    return (
        <div className="mt-3">
            <h1>Login to Continue</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name="password" placeholder="required" />
                </div>
                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
        </div>
    )
}

export default Login
