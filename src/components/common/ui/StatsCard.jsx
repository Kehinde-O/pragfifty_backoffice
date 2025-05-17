import React from 'react';
import PropTypes from 'prop-types';
import './StatsCard.css';

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
      className={`ui-stats-card ui-stats-card-${color} ui-stats-animate-${animationStyle} ${className} ${onClick ? 'ui-stats-card-clickable' : ''}`}
      onClick={handleClick}
      {...props}
    >
      <div className="ui-stats-card-content">
        <div className="ui-stats-card-header">
          <h3 className="ui-stats-card-title">{title}</h3>
          {icon && <div className={`ui-stats-card-icon ui-stats-card-icon-${color}`}>{icon}</div>}
        </div>
        
        <div className="ui-stats-card-body">
          {isLoading ? (
            <div className="ui-stats-card-loading">
              <div className="ui-stats-card-skeleton-value"></div>
              <div className="ui-stats-card-skeleton-change"></div>
            </div>
          ) : (
            <>
              <div className="ui-stats-card-value">{value}</div>
              
              {change !== undefined && (
                <div className={`ui-stats-card-change ui-stats-card-change-${changeType}`}>
                  {trend === 'up' && <span className="ui-stats-card-change-arrow">↑</span>}
                  {trend === 'down' && <span className="ui-stats-card-change-arrow">↓</span>}
                  <span className="ui-stats-card-change-value">{Math.abs(change)}%</span>
                  {changeLabel && <span className="ui-stats-card-change-label">{changeLabel}</span>}
                </div>
              )}
            </>
          )}
        </div>
        
        {footer && <div className="ui-stats-card-footer">{footer}</div>}
      </div>
      
      <div className="ui-stats-card-background-decoration"></div>
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