import React from 'react';
import './dataTable.scss';

/**
 * Define la estructura de una columna para el DataTable.
 * @template T El tipo de dato de la fila.
 */
export interface Column<T> {
  /** El texto a mostrar en la cabecera de la columna. */
  header: string;
  /** La clave del objeto de datos para acceder al valor de la celda. */
  accessor: keyof T;
  /** (Opcional) Una función para renderizar contenido personalizado en la celda. */
  render?: (row: T) => React.ReactNode;
  /** (Opcional) La clave del objeto de datos cuyo valor se usará para el atributo data-color. */
  dataColorAccessor?: keyof T;
}

/**
 * Props para el componente DataTable.
 * @template T El tipo de dato de la fila.
 */
interface DataTableProps<T> {
  /** (Opcional) Título que se muestra encima de la tabla. */
  title?: string;
  /** Array de objetos que definen las columnas de la tabla. */
  columns: Column<T>[];
  /** Array con los datos a mostrar en las filas. */
  data: T[];
  /** (Opcional) Clase CSS adicional para el contenedor principal. */
  className?: string;
}

/**
 * Un componente de tabla genérico y reutilizable.
 *
 * @template T El tipo de los objetos de datos que se mostrarán en la tabla.
 * @param {DataTableProps<T>} props Las propiedades del componente.
 * @returns Un elemento React que renderiza una tabla.
 */
const DataTable = <T extends Record<string, any>>({
  title,
  columns,
  data,
  className = '',
}: DataTableProps<T>): React.ReactElement => {
  return (
    <div className={`dataTableContainer ${className}`}>
      {/* Renderiza el título si se proporciona */}
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="dataTable__row">
              {columns.map((column, colIndex) => {
                // Prepara los props para la celda, incluyendo el data-color si es necesario
                const cellProps: { 'data-color'?: string } = {};
                if (column.dataColorAccessor && row[column.dataColorAccessor]) {
                  cellProps['data-color'] = row[column.dataColorAccessor];
                }

                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="dataTable__cell"
                    {...cellProps}
                  >
                    {/* Usa la función de renderizado si existe, si no, muestra el valor del accesor */}
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

