import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './PostJob.module.css';
import { toast } from 'react-toastify';

function PostJob() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        salary: '',
        location: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        salary: '',
        location: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        const MAX_DESCRIPTION_LENGTH = 100; // هنا قمنا بتحديد العدد 160 لتقليص النص إلى سطرين

        // تقليص النص إذا تجاوز الحد
        if (form.description.length > MAX_DESCRIPTION_LENGTH) {
            form.description = form.description.substring(0, MAX_DESCRIPTION_LENGTH); 
            alert('The description has been shortened 100 letters.');
        }

        let formErrors = { title: '', description: '', salary: '', location: '' };

        if (!form.title) formErrors.title = "Title is required.";
        if (!form.description) formErrors.description = "Description is required.";
        if (!form.salary) formErrors.salary = "Salary is required.";
        if (!form.location) formErrors.location = "Location is required.";

        setErrors(formErrors);

        if (formErrors.title || formErrors.description || formErrors.salary || formErrors.location) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/jobs', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            toast.success('Job added successfully!');
            navigate('/jobs-company');
        } catch (error) {
            alert('Failed to add the job.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>Add Job</h1>

                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Job title"
                    value={form.title}
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.title && <div className={style.error}>{errors.title}</div>}

                <label>Description</label>
                <textarea
                    name="description"
                    placeholder="Job description"
                    value={form.description}
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.description && <div className={style.error}>{errors.description}</div>}

                <label>Salary</label>
                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.salary && <div className={style.error}>{errors.salary}</div>}

                <label>Location</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className={style.input}
                />
                {errors.location && <div className={style.error}>{errors.location}</div>}

                <button type="submit">Post Job</button>
            </form>
        </div>
    );
}

export default PostJob;
