import React from 'react';
import PropTypes from 'prop-types';
import './StatsCard.css';

const StatsCard = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  color = 'primary',
  animationStyle = 'pulse', // pulse, fade, slide
  className = '',
  footer,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

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
          <div className="ui-stats-card-value">{value}</div>
          
          {change && (
            <div className={`ui-stats-card-change ui-stats-card-change-${changeType}`}>
              {changeType === 'positive' && <span className="ui-stats-card-change-arrow">↑</span>}
              {changeType === 'negative' && <span className="ui-stats-card-change-arrow">↓</span>}
              <span className="ui-stats-card-change-value">{change}</span>
            </div>
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
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  animationStyle: PropTypes.oneOf(['pulse', 'fade', 'slide', 'none']),
  className: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
};

export default StatsCard; 