import React from 'react'
import { useEffect, useState } from 'react'

const Prueba = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000');
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                const data = await res.json();
                console.log(data); // Muestra el objeto completo en la consola
                setItems(data.items || []); // Asegúrate de que sea un array
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                setItems([]); // Usa un array vacío como fallback
            }
        };
        fetchData();
    }, []);





    return (
        <>
            {items.length > 0 ? (
                items.map((i) => (
                    <p key={i._id}>{i.name}, {i.description}</p>
                ))
            ) : (
                <p>No hay elementos para mostrar.</p>
            )}
        </>
    );
}


export default Prueba