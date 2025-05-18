import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  startIcon, 
  endIcon, 
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[`button-${variant}`]} ${styles[`button-${size}`]} ${fullWidth ? styles.buttonFull : ''} ${className}`}
      {...props}
    >
      {startIcon && <span className={styles.buttonIcon}>{startIcon}</span>}
      <span className={styles.buttonContent}>{children}</span>
      {endIcon && <span className={styles.buttonIcon}>{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info', 'outlined', 'text']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button; 