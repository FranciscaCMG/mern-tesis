import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Item = ({ design, type, delete_design }) => {
  const [open, setOpen] = useState(false); // Estado para manejar la alerta

  // 🔥 Abrir alerta
  const handleOpen = () => {
    setOpen(true);
  };

  // 🔥 Cerrar alerta sin borrar
  const handleClose = () => {
    setOpen(false);
  };

  // 🔥 Confirmar eliminación
  const handleConfirmDelete = () => {
    delete_design(design._id); // Si el usuario confirma, se elimina el diseño
    setOpen(false);
  };

  return (
    <div className={`relative group w-full ${type ? "h-[100px]" : "h-[200px] px-2"}`}>
      {/* Imagen que redirige a la edición del diseño */}
      <Link to={`/design/${design._id}/edit`} className={`w-full h-[80%] block bg-[#49484825] rounded-md ${type ? "" : "p-4"}`}>
        <img className="w-full h-full rounded-md overflow-hidden" src={design.image_url} alt={design.title || "Diseño"} />
      </Link>

      {/* Título del diseño */}
      <div className="text-center mt-2 text-sm font-medium text-gray-700">
        {design.title && design.title !== "undefined" ? design.title : "Título no disponible"}
      </div>

      {/* Icono de borrar que abre la alerta */}
      <div
        onClick={handleOpen} // 🔥 Abre la alerta
        className="absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block"
      >
        <FaTrash />
      </div>

      {/* 🔥 Alerta de confirmación con MUI */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Eliminar diseño?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción eliminará el diseño de forma permanente. ¿Estás seguro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Item;
