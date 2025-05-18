import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import styles from './Table.module.css';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  striped = true,
  hoverable = true,
  bordered = false,
  size = 'md',
  emptyMessage = 'No data available',
  onRowClick,
  className = '',
  // Pagination props
  paginated = true,
  currentPage = 1,
  totalPages = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  ...props
}) => {
  return (
    <div className={`${styles.tableContainer} ${className}`} {...props}>
      <div className={styles.tableResponsive}>
        <table 
          className={`
            ${styles.table}
            ${styles[`table-${size}`]}
            ${striped ? styles.tableStriped : ''} 
            ${hoverable ? styles.tableHover : ''} 
            ${bordered ? styles.tableBordered : ''}
          `}
        >
          <thead className={styles.tableHeader}>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={column.accessor || index}
                  className={`${styles.tableTh} ${column.className || ''}`}
                  style={{ 
                    width: column.width, 
                    textAlign: column.align || 'left',
                    ...column.headerStyle
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {loading ? (
              <tr className={styles.tableLoadingRow}>
                <td colSpan={columns.length} className={styles.tableLoadingCell}>
                  <div className={styles.tableLoadingIndicator}>
                    <div className={styles.tableSpinner}></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr className={styles.tableEmptyRow}>
                <td colSpan={columns.length} className={styles.tableEmptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex}
                  className={`${styles.tableRow} ${onRowClick ? styles.tableRowClickable : ''}`}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={column.accessor || colIndex} 
                      className={`${styles.tableTd} ${column.cellClassName || ''}`}
                      style={{ 
                        textAlign: column.align || 'left',
                        ...column.cellStyle 
                      }}
                    >
                      {column.cell 
                        ? column.cell(row, rowIndex) 
                        : column.accessor 
                          ? row[column.accessor] 
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {paginated && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      accessor: PropTypes.string,
      cell: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      align: PropTypes.oneOf(['left', 'center', 'right']),
      className: PropTypes.string,
      cellClassName: PropTypes.string,
      headerStyle: PropTypes.object,
      cellStyle: PropTypes.object,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  emptyMessage: PropTypes.node,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  // Pagination props
  paginated: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

export default Table; 