import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from './Register.module.css';

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let formErrors = {};
        if (!form.name) formErrors.name = "Name is required";
        if (!form.email) formErrors.email = "Email is required";
        if (!form.password) formErrors.password = "Password is required";
        if (form.password !== form.password_confirmation) {
            formErrors.password_confirmation = "Passwords do not match";
        }
        if (!form.type) formErrors.type = "Please select user type";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", form);
            toast.success("Registration successful!");
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user.id);

            if (form.type === "company") {
                navigate("/company-form");
            } else {
                navigate("/login");
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                if (error.response.data.errors.email) {
                    setErrors({
                        ...formErrors,
                        email: error.response.data.errors.email[0],
                    });
                } else {
                    setErrors(error.response.data.errors);
                }
            } else {
                toast.error("Registration failed.");
            }
            console.error(error);
        }
    };


    return (
        <div>
            <h2>Register Page</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.name && <div className={style.error}>{errors.name}</div>}

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

                <input
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.password_confirmation && <div className={style.error}>{errors.password_confirmation}</div>}

                <select
                    name="type"
                    onChange={handleChange}
                    required
                    className={style.input}
                >
                    <option value="">Select Type</option>
                    <option value="applicant">Applicant</option>
                    <option value="company">Company</option>
                </select>
                {errors.type && <div className={style.error}>{errors.type}</div>}

                <button type="submit" className={style.button}>Register</button>
                <div>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Register;
