import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import style from './CompanyForm.module.css';
import { toast } from 'react-toastify';

function CompanyForm() {
    const [userId, setUserId] = useState(null);
    const [form, setForm] = useState({
        company_name: "",
        description: "",
        location: "",
    });

    const [errors, setErrors] = useState({
        company_name: "",
        description: "",
        location: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        setUserId(storedUserId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({
            company_name: "",
            description: "",
            location: "",
        });

        let formErrors = {};

        if (!form.company_name) formErrors.company_name = "Company name is required.";
        if (!form.description) formErrors.description = "Description is required.";
        if (!form.location) formErrors.location = "Location is required.";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return; 
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to submit the form.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/companies", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Company saved successfully!");
            navigate("/login"); 
        } catch (error) {
            alert("Form submission failed.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Company Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="company_name"
                        type="text"
                        placeholder="Company Name"
                        value={form.company_name}
                        onChange={handleChange}
                        className={style.input}
                    />
                    {errors.company_name && <div className={style.error}>{errors.company_name}</div>}
                </div>

                <div>
                    <input
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className={style.input}
                    />
                    {errors.description && <div className={style.error}>{errors.description}</div>}
                </div>

                <div>
                    <input
                        name="location"
                        type="text"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                        className={style.input}
                    />
                    {errors.location && <div className={style.error}>{errors.location}</div>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CompanyForm;
