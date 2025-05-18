import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatsCard.module.css';

const StatsCard = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  trend = 'neutral', // 'up', 'down', or 'neutral'
  color = 'primary',
  animationStyle = 'fade',
  isLoading = false,
  className = '',
  footer,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  // Map trend to changeType for styling
  const changeType = trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral';

  return (
    <div 
      className={`${styles.uiStatCard} ${styles[`statsCard-${color}`]} ${styles[`statsAnimate-${animationStyle}`]} ${className} ${onClick ? styles.statsCardClickable : ''}`}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.statsCardContent}>
        <div className={styles.statsCardHeader}>
          <h3 className={styles.statsCardTitle}>{title}</h3>
          {icon && <div className={`${styles.statsCardIcon} ${styles[`statsCardIcon-${color}`]}`}>{icon}</div>}
        </div>
        
        <div className={styles.statsCardBody}>
          {isLoading ? (
            <div className={styles.statsCardLoading}>
              <div className={styles.statsCardSkeletonValue}></div>
              <div className={styles.statsCardSkeletonChange}></div>
            </div>
          ) : (
            <>
              <div className={styles.statsCardValue}>{value}</div>
              
              {change !== undefined && (
                <div className={`${styles.statsCardChange} ${styles[`statsCardChange-${changeType}`]}`}>
                  {trend === 'up' && <span className={styles.statsCardChangeArrow}>↑</span>}
                  {trend === 'down' && <span className={styles.statsCardChangeArrow}>↓</span>}
                  <span className={styles.statsCardChangeValue}>{Math.abs(change)}%</span>
                  {changeLabel && <span className={styles.statsCardChangeLabel}>{changeLabel}</span>}
                </div>
              )}
            </>
          )}
        </div>
        
        {footer && <div className={styles.statsCardFooter}>{footer}</div>}
      </div>
      
      <div className={styles.statsCardBackgroundDecoration}></div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  icon: PropTypes.node,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeLabel: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  animationStyle: PropTypes.oneOf(['pulse', 'fade', 'slide', 'none']),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
};

export default StatsCard; 