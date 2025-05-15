import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

const Container = ({
  children,
  fluid = false,
  size = 'md',
  gutters = true,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`
        ui-container 
        ${fluid ? 'ui-container-fluid' : `ui-container-${size}`}
        ${gutters ? 'ui-container-gutters' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  gutters: PropTypes.bool,
  className: PropTypes.string,
};

export default Container; 