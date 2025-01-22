import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Item = ({ design, type, delete_design }) => {
    return (
        <div className={`relative group w-full ${type ? "h-[100px]" : "h-[200px] px-2"}`}>
            <Link to={`/design/${design._id}/edit`} className={`w-full h-[80%] block bg-[#49484825] rounded-md ${type ? '' : 'p-4'}`}>
                <img className="w-full h-full rounded-md overflow-hidden" src={design.image_url} alt={design.title || "Diseño"} />
            </Link>
            <div className="text-center mt-2 text-sm font-medium text-gray-700">
                {design.title && design.title !== 'undefined' ? design.title : 'Título no disponible'}
            </div>
            <div
                onClick={() => delete_design(design._id)}
                className="absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block"
            >
                <FaTrash />
            </div>
        </div>
    );
};

export default Item;
