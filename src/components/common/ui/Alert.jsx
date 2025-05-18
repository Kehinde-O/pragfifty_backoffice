import React from 'react';
import styles from './Alert.module.css';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimesCircle 
} from 'react-icons/fa';

const Alert = ({ 
  type = 'info', 
  title, 
  children, 
  onClose, 
  className = '', 
  icon = null 
}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'danger':
      case 'error':
        return <FaTimesCircle />;
      case 'info':
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`} role="alert">
      <div className={styles.iconContainer}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={styles.message}>{children}</div>
      </div>
      {onClose && (
        <button 
          type="button"
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close alert"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert; 