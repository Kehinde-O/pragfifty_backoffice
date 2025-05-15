import React from 'react';
import { FiClock, FiUser, FiActivity, FiInfo } from 'react-icons/fi';
import './UserActivity.css';

const UserActivity = ({ activities }) => {
  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    
    // Get hours ago
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    // Format time
    const timeString = date.toLocaleTimeString('en-NG', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
    
    if (diffInHours < 24) {
      if (diffInHours === 0) {
        return `Today at ${timeString}`;
      } else if (diffInHours === 1) {
        return `${diffInHours} hour ago at ${timeString}`;
      } else {
        return `${diffInHours} hours ago at ${timeString}`;
      }
    } else {
      return date.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="user-activity-log">
      {activities.length === 0 ? (
        <div className="no-activities">No recent activities</div>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <FiActivity />
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-user">
                    <FiUser className="icon" /> {activity.user}
                  </span>
                  <span className="activity-time">
                    <FiClock className="icon" /> {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                <div className="activity-description">{activity.action}</div>
                <div className="activity-meta">
                  <span className="activity-ip">
                    <FiInfo className="icon" /> IP: {activity.ipAddress}
                  </span>
                </div>
              </div>
              <div className="activity-actions">
                <button className="details-button">Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserActivity; 