import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoLogo from "/Logo2.png";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";
import { createXml, sendXml } from "../helpers/createXML";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import useWarnOnExit from "../helpers/useWarnOnExit";

const Header = ({ slides, design_id, attributes }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [title, setTitle] = useState("Ingresa el título");
  const [check, setCheck] = useState(false); 


  const handleCreateVideoClass =  async () => {
    setLoader2(true);
    const xml = await createXml(design_id);
    console.log(xml);
    sendXml(xml, title, setLoader2);
  };

  useWarnOnExit(check);

  useEffect(() => {
    if (attributes.audio_text ==! "" || attributes.color !== "" || attributes.image !== "" || attributes.text !== "" || attributes.top !== "" || attributes.left !== "" || slides.length > 0 ) {
      setCheck(true);
    }
  }, [attributes, slides]);

  const saveImage = async () => {
    const getDiv = document.getElementById("photo-0");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = { design: slides };
      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
      formData.append("title", title);

      try {
        setLoader(true);
        const { data } = await api.put(`/api/update-user-design/${design_id}`, formData);
        toast.success(data.message);
        setLoader(false);
        setCheck(false);
      } catch (error) {
        setLoader(false);
        toast.error(error.response.data.message);
      }
    }
  };
  const get_user_design = async () => {
    try {
      const { data } = await api.get(`/api/user-design/${design_id}`)
      setTitle(data.design.title);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };
  useEffect(() => {
    get_user_design();
  }, []);

  const handleLogoClick = () => {
    if (check) {
      const confirmLeave = window.confirm("Tienes cambios sin guardar. ¿Seguro que quieres salir?");
      if (!confirmLeave) return;
    }
    navigate("/"); 
  };

  return (
    <div className="h-[60px] bg-white shadow-md w-full">
      <div className="flex justify-between px-10 items-center text-gray-700 h-full">
        <button className="w-[80px] h-[48px]" onClick={handleLogoClick}>
          <img className="w-full h-full" src={videoLogo} alt="imagen Logo" />
        </button>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500"
        />

        <div className="flex justify-center items-center gap-4">
          <button
            disabled={loader}
            onClick={saveImage}
            className={`px-4 py-2 rounded-md text-white font-semibold shadow-md flex items-center gap-2 transition-all duration-300 ${
              loader
                ? "bg-gray-400 cursor-not-allowed"
                : check
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loader ? "Cargando..." : check ? "Guardar" : "Guardado"}
            {loader ? null : check ? <FaExclamationTriangle /> : <FaCheckCircle />}
          </button>

          {!check && (
            <button
              disabled={loader2}
              onClick={() => handleCreateVideoClass()}
              className={"px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"}
            >
              {loader2 ? "Cargando..." : "Crear la videoclase"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
