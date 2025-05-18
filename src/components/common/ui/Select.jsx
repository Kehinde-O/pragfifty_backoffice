import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = ({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  label,
  size = 'md',
  error,
  disabled = false,
  required = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`${styles.selectContainer} ${error ? styles.selectError : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.selectLabel}>
          {label} {required && <span className={styles.selectRequired}>*</span>}
        </label>
      )}
      
      <div className={`${styles.selectWrapper} ${styles[`select-${size}`]} ${disabled ? styles.selectDisabled : ''}`}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={styles.select}
          {...props}
        >
          {placeholder && !children && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {children ? (
            children
          ) : (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          )}
        </select>
        
        <div className={styles.selectArrow}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      
      {error && <div className={styles.selectErrorText}>{error}</div>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Select; 