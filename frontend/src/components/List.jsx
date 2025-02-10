import React, { useState } from 'react';

function List({ initialItems = [], isOrdered = false, updateListData }) {
  const [listItems, setListItems] = useState(initialItems);

  const handleChange = (index, value) => {
    const updatedList = [...listItems];
    updatedList[index] = value;
    setListItems(updatedList);
    updateListData(updatedList);
  };

  const addItem = () => {
    const updatedList = [...listItems, 'Nuevo ítem'];
    setListItems(updatedList);
    updateListData(updatedList);
  };

  const removeItem = (index) => {
    const updatedList = listItems.filter((_, i) => i !== index);
    setListItems(updatedList);
    updateListData(updatedList);
  };

  return (
    <div className="flex flex-col gap-2">
      {isOrdered ? (
        <ol className="list-decimal ml-4">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="flex items-center justify-start w-full gap-2">
                <span className="text-gray-600">{index + 1}.</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div
                onClick={() => removeItem(index)}
                className="flex items-center justify-center w-7 h-7 bg-red-100 rounded-full hover:bg-red-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc ml-4">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="flex items-center justify-start w-full gap-2">
                <span className="text-gray-600">•</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div
                onClick={() => removeItem(index)}
                className="flex items-center justify-center w-7 h-7 bg-red-100 rounded-full hover:bg-red-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        onClick={addItem}
        className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer self-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </div>
  );
}

export default List;
