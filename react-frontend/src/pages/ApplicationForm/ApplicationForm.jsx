import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ApplicationForm.module.css";
import { toast } from 'react-toastify';
import echo from '../../Echo'; 

function ApplicationForm() {
    const [form, setForm] = useState({
        cover_letter: "",
    });

    const [errors, setErrors] = useState({
        cover_letter: "",
    });

    const { jobId } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = { cover_letter: "" };

        if (!form.cover_letter) {
            formErrors.cover_letter = "Cover letter is required.";
        }

        setErrors(formErrors);

        if (formErrors.cover_letter) {
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to submit the form.");
            return;
        }

        try {
            const applicationData = {
                status: "pending",
                ...form,
                job_id: jobId,
            };

            await axios.post("http://localhost:8000/api/applications", applicationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Application submitted successfully!");
            navigate("/jobs");

        } catch (error) {
            alert("Form submission failed.");
            console.error(error);
        }
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>Application Form</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <textarea
                    name="cover_letter"
                    placeholder="Cover Letter"
                    value={form.cover_letter}
                    onChange={handleChange}
                    className={style.input}
                    rows={4}
                />
                {errors.cover_letter && <div className={style.error}>{errors.cover_letter}</div>}

                <input
                    type="hidden"
                    name="status"
                    value="pending"
                />

                <button type="submit" className={style.submitBtn}>Submit</button>
            </form>
        </div>
    );
}

export default ApplicationForm;
