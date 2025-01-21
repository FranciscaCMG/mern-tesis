import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoLogo from "/Logo2.png";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";

const Header = ({ slides, design_id }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: slides,
      };
      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);

      try {
        setLoader(true);
        const { data } = await api.put(`/api/update-user-design/${design_id}`, formData);
        toast.success(data.message);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const downloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    const link = document.createElement("a");
    link.download = "image";
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-[60px] bg-white shadow-md w-full">
      <div className="flex justify-between px-10 items-center text-gray-700 h-full">
        {/* Logo */}
        <Link className="w-[80px] h-[48px]" to="/">
          <img className="w-full h-full" src={videoLogo} alt="imagen Logo" />
        </Link>

        {/* Título */}
        <span className="text-xl font-semibold text-gray-900">Mini videoclases</span>

        {/* Botones */}
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={loader}
            onClick={saveImage}
            className={`px-4 py-2 rounded-md text-white font-semibold shadow-md ${
              loader
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            } transition-all duration-300`}
          >
            {loader ? "Cargando..." : "Guardar"}
          </button>
          <button
            onClick={downloadImage}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
