import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

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
        ${styles.container}
        ${fluid ? styles['container-fluid'] : styles[`container-${size}`]}
        ${gutters ? styles.containerGutters : ''}
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