import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  variant = 'default',
  elevation = 'md',
  accent,
  className = '',
  isFullWidth = false,
  ...props
}) => {
  const getAccentClass = () => {
    if (!accent) return '';
    return typeof accent === 'boolean' 
      ? styles.cardAccent 
      : styles[`cardAccent${accent.charAt(0).toUpperCase() + accent.slice(1)}`];
  };

  return (
    <div 
      className={`
        ${styles.card} 
        ${styles[`card${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} 
        ${styles[`cardElevation${elevation.charAt(0).toUpperCase() + elevation.slice(1)}`]} 
        ${getAccentClass()}
        ${styles[`${isFullWidth ? 'cardFullWidth' : ''}`]}
        ${className}
      `} 
      {...props}
    >
      {(title || actions) && (
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderContent}>
            {title && <h2 className={styles.cardTitle}>{title}</h2>}
            {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
          </div>
          {actions && <div className={styles.cardActions}>{actions}</div>}
        </div>
      )}
      
      <div className={styles.cardBody}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.cardFooter}>
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
  accent: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'info'])
  ]),
  className: PropTypes.string,
};

export default Card; 