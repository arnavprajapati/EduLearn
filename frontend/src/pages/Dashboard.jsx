import React from 'react';
import { useSelector } from 'react-redux';
import EducatorDashboard from '../pages/Educator/EducatorDashboard.jsx'
import StudentDashboard from '../pages/StudentDashboard.jsx'

const Dashboard = () => {
    const { userData } = useSelector((state) => state.user);
    const role = userData?.role || 'student';

    // Rerouting logic based on role
    if (role === 'educator') {
        return <EducatorDashboard />;
    }
    
    // Default to student dashboard
    return <StudentDashboard />;
};

export default Dashboard;