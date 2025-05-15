import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  variant = 'default',
  elevation = 'md',
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-card ui-card-${variant} ui-card-elevation-${elevation} ${className}`} {...props}>
      {(title || actions) && (
        <div className="ui-card-header">
          <div className="ui-card-header-content">
            {title && <h2 className="ui-card-title">{title}</h2>}
            {subtitle && <div className="ui-card-subtitle">{subtitle}</div>}
          </div>
          {actions && <div className="ui-card-actions">{actions}</div>}
        </div>
      )}
      
      <div className="ui-card-body">
        {children}
      </div>
      
      {footer && (
        <div className="ui-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outline', 'flat']),
  elevation: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Card; 