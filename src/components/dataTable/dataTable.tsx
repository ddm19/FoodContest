import React, { useMemo } from 'react';
import './dataTable.scss';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
  dataColorAccessor?: keyof T;
}

/**
 * Props para el componente DataTable.
 * @template T El tipo de dato de la fila.
 */
interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  className?: string;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  isBlurred?: boolean;
}

const DataTable = <T extends Record<string, any>>({
  title,
  columns,
  data,
  className = '',
  sortBy,
  sortOrder = 'desc',
}: DataTableProps<T>): React.ReactElement => {


  const sortedData = useMemo(() => {
    if (!sortBy) {
      return data;
    }

    const sortableData = [...data];

    sortableData.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return 0;
    });

    return sortableData;
  }, [data, sortBy, sortOrder]);

  const removeBlurredClass = (rowIndex: number) => {
    const cell = document.getElementById(`dataTable__blurred-${rowIndex}`);
    if (cell) {
      cell.classList.add('dataTable__unblurred');
      setTimeout(() => {
        cell.classList.remove('dataTable__blurred');
        cell.classList.remove('dataTable__unblurred');
      }, 500);
    }
  };

  return (
    <div className={`dataTableContainer ${className}`}>
      {title && <h1 className="dataTableContainer__title">{title}</h1>}

      <table className="dataTable">
        <thead className="dataTable__thead">
          <tr className="dataTable__row">
            {columns.map((column) => (
              <th key={String(column.accessor)} className="dataTable__cell dataTable__cell--header">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="dataTable__tbody">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`dataTable__row dataTable__blurred`}
              onClick={() => removeBlurredClass(rowIndex)}
              id={`dataTable__blurred-${rowIndex}`}
            >              {columns.map((column, colIndex) => {
              const cellProps: { 'data-color'?: string } = {};
              if (column.dataColorAccessor && row[column.dataColorAccessor]) {
                cellProps['data-color'] = row[column.dataColorAccessor];
              }

              return (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`dataTable__cell`}
                  {...cellProps}

                >
                  {column.render ? column.render(row) : String(row[column.accessor])}

                </td>
              );
            })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
