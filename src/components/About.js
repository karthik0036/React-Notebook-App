import React from 'react'
import { Link } from 'react-router-dom'


const About = () => {


    return (
        <div className="container-fluid">
            <div className="position-relative overflow-hidden text-center bg-light">
                <div className="col-md-5  mx-auto my-5">
                    <h1 className="display-4 fw-normal">Saving notes on Cloud</h1>
                    <p className="lead fw-normal">CRUD operations in React ,Login with valid email and passwords. Jumpstart to store your notes.</p>
                    <Link className="btn btn-outline-secondary" to="/login">Login</Link>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
        </div>
    )
}

export default About
