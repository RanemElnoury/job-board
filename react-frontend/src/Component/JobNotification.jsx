import React, { useEffect, useState } from 'react';
import echo from '../Echo'; 

const JobNotifications = ({ jobId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!jobId) {
            console.log("Waiting for valid jobId...");
            return;
        }

        const channel = echo.channel(`job.${jobId}`);
    
        channel.listen('.JobApplied', (event) => {
            console.log('Event received:', event);

            const newNotification = `${event.userName} applied for job ${event.jobId}`;
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                newNotification,
            ]);

            if (Notification.permission === "granted") {
                new Notification('New Job Application', {
                    body: `${event.userName} applied for job ${event.jobId}`,
                    icon: '/path-to-icon.png' 
                });
            }
        });
        
        return () => {
            channel.stopListening('.JobApplied');
        };
    
    }, [jobId]);

    return (
        <div>
            <h3>Job Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default JobNotifications;
