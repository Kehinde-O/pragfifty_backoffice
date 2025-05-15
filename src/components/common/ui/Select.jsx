import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

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
  ...props
}) => {
  return (
    <div className={`ui-select-container ${error ? 'ui-select-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="ui-select-label">
          {label} {required && <span className="ui-select-required">*</span>}
        </label>
      )}
      
      <div className={`ui-select-wrapper ui-select-${size} ${disabled ? 'ui-select-disabled' : ''}`}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="ui-select"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="ui-select-arrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      
      {error && <div className="ui-select-error-text">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
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
};

export default Select; 