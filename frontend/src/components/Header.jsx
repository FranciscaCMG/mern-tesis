import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoLogo from "/Logo2.png";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";
import toast from "react-hot-toast";
import { createXml, sendXml } from "../helpers/createXML";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import useWarnOnExit from "../helpers/useWarnOnExit";
import { token_decode } from '../utils/index';

const Header = ({ slides, design_id, attributes }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [title, setTitle] = useState("Ingresa el título");
  const [check, setCheck] = useState(false);

  const handleCreateVideoClass = async () => {
    try {
      setLoader2(true);
      const xml = await createXml(design_id);
      if (!xml) throw new Error("Error al generar el XML");

      console.log(xml);
      await sendXml(xml, title, setLoader2);
    } catch (error) {
      console.error("Error en handleCreateVideoClass:", error);
      toast.error("Error al crear la videoclase.");
    } finally {
      setLoader2(false);
    }
  };

  useWarnOnExit(check);

  useEffect(() => {
    if (
      attributes.audio_text !== "" ||
      attributes.color !== "" ||
      attributes.image !== "" ||
      attributes.text !== "" ||
      attributes.top !== "" ||
      attributes.left !== "" ||
      slides.length > 0
    ) {
      console.log("Atributo cambiado")
      setCheck(true);
    }
  }, [attributes, slides]);

  const saveImage = async () => {
    try {
        setLoader(true);

        const token = localStorage.getItem("canva_token");
        if (!token) {
            throw new Error("No se encontró el token. Inicia sesión nuevamente.");
        }

        const getDiv = document.getElementById("photo-0");
        if (!getDiv) throw new Error("No se encontró el div con ID 'photo-0'.");

        const images = getDiv.getElementsByTagName("img");
        [...images].forEach((img) => {
            if (!img.src.startsWith(window.location.origin)) {
                img.setAttribute("crossorigin", "anonymous");
            }
        });

        await Promise.allSettled(
            [...images].map(
                (img) =>
                    new Promise((resolve, reject) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                            img.onerror = () => {
                                console.warn(`Error al cargar la imagen: ${img.src}`);
                                resolve(); 
                            };
                        }
                    })
            )
        );

        const image = await htmlToImage.toBlob(getDiv);
        if (!image) throw new Error("No se pudo generar la imagen.");

        const formData = new FormData();
        formData.append("design", JSON.stringify({ design: slides }));
        formData.append("image", image);
        formData.append("title", title);

        const response = await fetch(`/api/update-user-design/${design_id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`, 
            },
            body: formData,
        });

        if (response.status === 401) {
            throw new Error("No tienes autorización para guardar. Inicia sesión nuevamente.");
        }

        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        toast.success("Presentación guardada con éxito.");
        setCheck(false);
    } catch (error) {
        console.error("Error en saveImage:", error);
        toast.error(error.message || "Error al guardar la imagen.");
    } finally {
        setLoader(false);
    }
};


  const get_user_design = async () => {
    try {
      const { data } = await api.get(`/api/user-design/${design_id}`);
      setTitle(data.design.title);
    } catch (error) {
      console.error("Error fetching designs:", error);
      toast.error("Error al cargar el diseño.");
    }
  };

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        await get_user_design();
      } catch (error) {
        console.error("Error al obtener el diseño:", error);
        toast.error("No se pudo cargar el diseño.");
      }
    };
    fetchDesign();
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
            className={`px-4 py-2 rounded-md text-white font-semibold shadow-md flex items-center gap-2 transition-all duration-300 ${loader
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
              onClick={handleCreateVideoClass}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
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
