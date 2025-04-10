import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import style from './JobList.module.css';
import { toast } from 'react-toastify';
import JobNotifications from '../../Component/JobNotification'; // Import JobNotifications component

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [jobId, setJobId] = useState(null); // Store jobId for notification
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
        setJobId(jobId); // Set jobId when user applies to a job
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

            {/* Job Notifications */}
            {jobId && <JobNotifications jobId={jobId} />} {/* Render notifications only if jobId is set */}

            {Array.isArray(jobs) && jobs.length > 0 ? (
                <div className="row">
                    {jobs.map((job) => (
                        <div className="col-12" key={job.id}>
                            <div className={style.card}>
                                <div className={`${style.cardBody} d-flex justify-content-between align-items-start flex-wrap`}>
                                    <div className={style.cardContent}>
                                        <h5 className={style.cardTitle}><strong></strong> {job.title}</h5>
                                        <p className={style.cardText}>{job.description}</p>
                                        <p className={style.cardText}><strong>Salary:</strong> {job.salary}</p>
                                        <p className={style.cardText}><strong>Location:</strong> {job.location}</p>
                                    </div>
                                    <button
                                        className={style.applyBtn}
                                        onClick={() => handleApply(job.id)}>
                                        Apply Now
                                    </button>
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
