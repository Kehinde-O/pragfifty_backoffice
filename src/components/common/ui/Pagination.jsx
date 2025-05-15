import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  showPageNumbers = true,
  maxPageNumbers = 5,
  className = '',
  ...props
}) => {
  // Generate the page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= maxPageNumbers) {
      // If we have fewer pages than the max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for when we have more pages than we can display
      const halfWay = Math.ceil(maxPageNumbers / 2);
      
      if (currentPage <= halfWay) {
        // We're near the start
        for (let i = 1; i <= maxPageNumbers - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfWay + 1) {
        // We're near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxPageNumbers - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // We're in the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        const startPage = currentPage - Math.floor((maxPageNumbers - 4) / 2);
        const endPage = currentPage + Math.ceil((maxPageNumbers - 4) / 2);
        
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(Number(e.target.value));
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`ui-pagination ${className}`} {...props}>
      <div className="ui-pagination-info">
        {onRowsPerPageChange && (
          <div className="ui-pagination-rows-per-page">
            <span>Rows per page:</span>
            <select 
              value={rowsPerPage} 
              onChange={handleRowsPerPageChange}
              className="ui-pagination-select"
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className="ui-pagination-controls">
        <button 
          className="ui-pagination-button ui-pagination-prev" 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        {showPageNumbers && (
          <div className="ui-pagination-pages">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="ui-pagination-ellipsis">...</span>
                ) : (
                  <button
                    className={`ui-pagination-page ${currentPage === page ? 'ui-pagination-page-active' : ''}`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        
        <button 
          className="ui-pagination-button ui-pagination-next" 
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  showPageNumbers: PropTypes.bool,
  maxPageNumbers: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination; 