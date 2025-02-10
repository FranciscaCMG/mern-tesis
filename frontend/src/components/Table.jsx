import React, { useState, useEffect } from 'react';

function Table({ rows, columns = [], tableData, updateTableData, maximo }) {
  columns = Array.isArray(columns) ? columns : [];
  const [localTableData, setLocalTableData] = useState(
    tableData || Array(rows).fill(0).map(() => Array(columns).fill(''))
  );

  const handleChange = (rowIndex, colIndex, value) => {
    const updatedTableData = [...localTableData];
    updatedTableData[rowIndex][colIndex] = value;
    setLocalTableData(updatedTableData);
    updateTableData({ columns, rows: updatedTableData }); // Notificar al padre sobre el cambio
  };

  const createRows = () => {
    return localTableData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, colIndex) => (          
          <td key={colIndex} className="px-1 py-1 border border-grey-300">
            <input
              type="text"
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className={maximo}
            />
          </td>
        ))}
      </tr>
    ));
  };
  const createHeaders = () => {
    return (
      <tr>
        {columns.map((header, colIndex) => (
          <th key={colIndex}>
            <input
              type="text"
              value={header}
              onChange={(e) => handleHeaderChange(colIndex, e.target.value)}
            />
          </th>
        ))}
      </tr>
    );
  };

  const handleHeaderChange = (colIndex, value) => {
    const updatedColumns = [...columns];
    updatedColumns[colIndex] = value;
    updateTableData({ columns: updatedColumns, rows: localTableData });
  };

  useEffect(() => {
    setLocalTableData(tableData); // Sincronizar cambios externos en `tableData`
  }, [tableData]);

  return (
    <table className="border-collapse">
      <thead>
        {createHeaders()}
      </thead>
      <tbody>{createRows()}</tbody>
    </table>
  );
}

export default Table;
