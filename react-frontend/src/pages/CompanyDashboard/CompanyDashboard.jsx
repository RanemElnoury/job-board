import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CompanyDashboard.module.css';
import { toast } from 'react-toastify';

function CompanyDashboard() {
    const navigate = useNavigate();

    const goToJobs = () => {
        navigate('/jobs-company');
    };

    const goToAddPost = () => {
        navigate('/add-post');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <div className={style.dashboard}>
            <div className={style.header}>
                <h1>Company Dashboard</h1>
                <button className={style.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>

            <div className={style.container}>
                <div className={style.box} onClick={goToJobs}>
                    <h2>Jobs</h2>
                    <p>View available jobs</p>
                </div>
                <div className={style.box} onClick={goToAddPost}>
                    <h2>Add Post</h2>
                    <p>Add a new job posting</p>
                </div>
            </div>
        </div>
    );
}

export default CompanyDashboard;
