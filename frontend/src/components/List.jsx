import React, { useState } from 'react';

function List({ initialItems = [], isOrdered = false, updateListData }) {
  const [listItems, setListItems] = useState(initialItems);
  const [isSaved, setIsSaved] = useState(false); // Estado para controlar si la lista está guardada
  const [showSaveMessage, setShowSaveMessage] = useState(false); // Estado para mostrar el mensaje de guardado

  const handleChange = (index, value) => {
    const updatedList = [...listItems];
    updatedList[index] = value;
    setListItems(updatedList);
    updateListData(updatedList); // Notificar cambios al padre
  };

  const addItem = () => {
    const updatedList = [...listItems, 'Nuevo ítem'];
    setListItems(updatedList);
    updateListData(updatedList); // Notificar cambios al padre
  };

  const removeItem = (index) => {
    const updatedList = listItems.filter((_, i) => i !== index);
    setListItems(updatedList);
    updateListData(updatedList); // Notificar cambios al padre
  };

  const saveList = () => {
    setIsSaved(true); // Marcar la lista como guardada
    setShowSaveMessage(true); // Mostrar el mensaje de guardado
    setTimeout(() => {
      setShowSaveMessage(false); // Ocultar el mensaje después de 2 segundos
    }, 2000);
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
                  disabled={isSaved} // Desactivar el input si la lista está guardada
                />
              </div>
              {!isSaved && (
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc ml-4">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="flex items-center justify-start w-full gap-2">
                <span className="text-gray-600">•</span> {/* Punto manual */}
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                  disabled={isSaved} // Desactivar el input si la lista está guardada
                />
              </div>
              {!isSaved && (
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {!isSaved && (
        <div className="flex gap-2">
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar ítem
          </button>
          <button
            onClick={saveList}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      )}

      {showSaveMessage && (
        <div className="text-center text-green-500 font-medium">
          ¡Lista guardada!
        </div>
      )}
    </div>
  );
}

export default List;
