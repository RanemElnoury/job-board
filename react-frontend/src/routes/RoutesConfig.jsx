import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from '../pages/register/register';
import Login from '../pages/Login/Login';
import CompanyForm from '../pages/CompanyForm/CompanyForm';
import ApplicationForm from '../pages/ApplicationForm/ApplicationForm';
import JobList from '../pages/JobsList/JobList';
import CompanyDashboard from '../pages/CompanyDashboard/CompanyDashboard';
import PostJob from '../pages/PostJob/PostJob';
import JobsCompany from '../pages/JobsCompany/jobsCompany';
function RoutesConfig() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={< Login/>} />
                <Route path="/" element={<Register />} />
                <Route path="/company-form" element={<CompanyForm />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/jobs-company" element={<JobsCompany />} />
                <Route path="/application-form/:jobId" element={<ApplicationForm />} />
                <Route path="/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/add-post" element={<PostJob />} />
                
            </Routes>
        </Router>
    )
}

export default RoutesConfig

