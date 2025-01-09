import React, { useState, useEffect } from 'react';

function Table({ rows, columns, tableData, updateTableData }) {
  const [localTableData, setLocalTableData] = useState(
    tableData || Array(rows).fill(0).map(() => Array(columns).fill(''))
  );

  const handleChange = (rowIndex, colIndex, value) => {
    const updatedTableData = [...localTableData];
    updatedTableData[rowIndex][colIndex] = value;
    setLocalTableData(updatedTableData);
    updateTableData(updatedTableData); // Notificar al padre sobre el cambio
  };

  const createRows = () => {
    return localTableData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, colIndex) => (
          <td key={colIndex} className="px-4 py-2 border border-gray-300">
            <input
              type="text"
              value={cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className="w-full"
            />
          </td>
        ))}
      </tr>
    ));
  };

  useEffect(() => {
    setLocalTableData(tableData); // Sincronizar cambios externos en `tableData`
  }, [tableData]);

  return (
    <table className="table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          {Array(columns)
            .fill(0)
            .map((_, index) => (
              <th key={index} className="px-4 py-2 border border-gray-300">
                Columna {index + 1}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>{createRows()}</tbody>
    </table>
  );
}

export default Table;
