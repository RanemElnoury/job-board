import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from './jobsCompany.module.css';
import { toast } from 'react-toastify';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/jobs");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const handleApply = (jobId) => {
        navigate(`/application-form/${jobId}`);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <div className={style.jobPageContainer}>
            <div className={`${style.headerRow} mb-4`}>
                <h2 className={style.pageTitle}>Available Jobs</h2>
                <button className={style.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>

            {Array.isArray(jobs) && jobs.length > 0 ? (

                <div className="row">
                    {jobs.map((job) => (
                        <div className="col-12" key={job.id}>
                            <div className={style.card}>
                                <div className={`${style.cardBody} `}>
                                    <div className={style.cardContent}>
                                        <h5 className={style.cardTitle}><strong></strong> {job.title}</h5>
                                        <p className={style.cardText}>{job.description}</p>
                                        <p className={style.cardText}><strong>Salary:</strong> {job.salary}</p>
                                        <p className={style.cardText}><strong>Location:</strong> {job.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No jobs found.</p>
            )}
        </div>
    );
}

export default JobList;
