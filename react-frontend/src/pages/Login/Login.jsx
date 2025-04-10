import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import style from "./Login.module.css";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({}); 
    const [apiError, setApiError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); 
        setApiError(""); 

        let formErrors = {};
        if (!form.email) formErrors.email = "Email is required"; 
        if (!form.password) formErrors.password = "Password is required"; 
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; 
        }

        try {
            const response = await axios.post("http://localhost:8000/api/login", form);
            console.log("Login response:", response.data);

            const { token, redirect } = response.data;

            localStorage.setItem("token", token);
            toast.success("Login successful!");

            if (redirect === "company-form") {
                navigate("/company-dashboard");
            } else {
                navigate("/jobs");
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setApiError("Invalid email or password"); 
            }
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.email && <div className={style.error}>{errors.email}</div>} 
                
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.password && <div className={style.error}>{errors.password}</div>} 
                {apiError && <div className={style.error}>{apiError}</div>}

                <button type="submit">Login</button>
                <div>
                <p>Don't have an account? <Link to="/">Register</Link></p>
            </div>
            </form>
        </div>
    );
}

export default Login;
