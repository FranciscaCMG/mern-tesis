import api from "../utils/api";
import axios from "axios";
import { saveAs } from "file-saver";
import xmlFormatter from "xml-formatter";

export const createMetadatos = async (design_id) => {
    try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const userName = localStorage.getItem("user_name") || "USUARIO";
        const title = data.design?.title || "Diseño sin título";
        const updatedAt = data.design?.updatedAt || new Date().toISOString();
        const xmlMetadatos = `
    <Metadatos>
        <SoftwareVersion>1.0</SoftwareVersion>
        <Titulo>${title}</Titulo>
        <Autoria>${userName}</Autoria>
        <Fecha>${updatedAt}</Fecha>
    </Metadatos>`.trim();
        return xmlMetadatos;
    } catch (error) {
        console.error("Error fetching designs:", error);
    }
};

function generarTabla(tableData, subtitulo, descripcion) {
    if (!tableData || tableData.length === 0) return "";
    let xml = `<subtitulo>${subtitulo}</subtitulo> `;
    xml += `        <tabla descripcion="${descripcion}">\n`;

    tableData.forEach((fila) => {
        xml += `            <fila>\n`;
        fila.forEach((celda) => {
            xml += `                <celda>${celda}</celda>\n`;
        });
        xml += `            </fila>\n`;
    });

    xml += `        </tabla>\n`;
    return xml;
}

function generarListaO(listItems, subtitulo) {
    if (!listItems || listItems.length === 0) return "";
    let xml = `<subtitulo>${subtitulo}</subtitulo> `;
    xml += `        <listaOrdenada>\n`;
    listItems.forEach((item) => {
        xml += `            <item>${item}</item>\n`;
    });
    xml += `        </listaOrdenada>\n`;
    return xml;
}
function generarListaD(listItems, subtitulo) {
    if (!listItems || listItems.length === 0) return "";
    let xml = `<subtitulo>${subtitulo}</subtitulo> `;
    xml += `       <listaNoOrdenada>\n`;
    listItems.forEach((item) => {
        xml += `            <item>${item}</item>\n`;
    });
    xml += `        </listaNoOrdenada>\n`;
    return xml;
}

function generarDiapositivaInteractiva(slide) {
    let pregunta = slide.components.find(c => c.name === "titulo")?.title || "Pregunta no definida";
    let alternativas = slide.components.filter(c => c.name === "alternative");
    let retroalimentacion = slide.components.find(c => c.name === "Retroalimentacion")?.title || "No hay retroalimentación";

    let xml = `    <Diapositiva disposicion="interactivo-alternativas">\n`;
    xml += `        <pregunta>\n            ${pregunta}\n        </pregunta>\n`;
    xml += `        <alternativas>\n`;

    alternativas.forEach((alt) => {
        let esCorrecta = alt.alternative ? "true" : "false";
        xml += `            <alternativa correcto="${esCorrecta}">${alt.title}</alternativa>\n`;
    });

    xml += `        </alternativas>\n`;
    xml += `        <retroalimentacion>\n            ${retroalimentacion}\n        </retroalimentacion>\n`;
    xml += `    </Diapositiva>\n`;

    return xml;
}

function generarDiapositivas(data) {
    let xml = `<Contenido>\n`;

    data.components.forEach((slide) => {
        let disposicion = obtenerDisposicion(slide.components);
        let titulo = obtenerTitulo(slide.components);

        if (disposicion === "interactivo-alternativas") {
            xml += generarDiapositivaInteractiva(slide);
        } else {
            xml += `    <Diapositiva disposicion="${disposicion}" titulo="${titulo[0]}" tts= "${titulo[1]}" >\n`;

            slide.components.forEach((component) => {
                let region = determinarJustificacion(component);
                let contenido = generarContenido(component);

                if (contenido) {
                    xml += `        <region justificacion="${region}" tts="${component.audio_text || ""}">\n`;
                    xml += `            ${contenido}\n`;
                    xml += `        </region>\n`;
                }
            });

            xml += `    </Diapositiva>\n`;
        }
    });

    xml += `</Contenido>`;
    return xml;
}

function obtenerDisposicion(components) {
    const tipoSlide = components.find((c) => c.type_slide)?.type_slide || 1;
    const tipos = {
        1: "individual",
        2: "titulo",
        3: "cuarteto",
        4: "Trio-2v-derecho",
        5: "Trio-2v-izquierdo",
        6: "Trio-2h-inferior",
        7: "Trio-2h-superior",
        8: "duo-vertical",
        9: "duo-horizontal",
        10: "interactivo-alternativas",
    };
    return tipos[tipoSlide] || "individual";
}

function obtenerTitulo(components) {
    const titulo = components.find((c) => c.name === "titulo");
    const title = titulo.title;
    const tts = titulo.audio_text;
    return [title, tts];
}

function determinarJustificacion(components) {
    const textAlign = components.textAlign;
    if (textAlign === "left") {
        return "izquierda";
    }
    if (textAlign === "right") {
        return "derecha";
    }
    else {
        return "centro";
    }

}

function generarContenido(component) {
    let xml = "";

    switch (component.name) {
        case "text":
            xml += `            <texto>${component.title}</texto>\n`;
            break;
        case "Subtitulo":
            xml += `            <subtitulo>${component.title}</subtitulo>\n`;
            break;
        case "Parrafo":
            xml += `            <texto>${component.title}</texto>\n`;
            break;
        case "image":
            xml += `            <imagen url="${component.image}" descripcion=""/>\n`;
            break;
        case "code":
            xml += `            <codigo>${component.title}</codigo>\n`;
            break;
        case "list":
            if (component.isOrdered === false) {
                xml += `${generarListaD(component.listItems, component.title)}\n`;
                break;
            }
            else {
                xml += `${generarListaO(component.listItems, component.title)}\n`;
                break;
            }
            break;
        case "table":
            xml += `${generarTabla(component.tableData, component.title, component.description)}\n`;
            break;
        default:
            break;
    }

    return xml;
}

const createVideoclase = (metadatos, diapositivas) => {
    const xmlVersion = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlFinal = `
${xmlVersion}
<Videoclase>
${metadatos}
${diapositivas}
</Videoclase>`.trim();

    return xmlFormatter(xmlFinal, {
        indentation: "    ",
        collapseContent: false,
    });
};

export const sendXml = async (xmlContent, fileName, setLoader2) => {
    const formData = new FormData();
    const blob = new Blob([xmlContent], { type: "application/xml" });
    formData.append("file", blob, fileName);

    try {
        const response = await axios.post("https://gavc.onrender.com/generate-presentation/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const htmlBlob = new Blob([response.data], { type: "text/html" });
        saveAs(htmlBlob, `${fileName}.html`);
    } catch (error) {
        console.error("Error sending XML:", error);
    } finally {
        setLoader2(false);
    }
};

export const createXml = async (design_id) => {
    try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        if (!data) {
            console.error("No se encontró el diseño.");
            return;
        }

        const metadatosXml = await createMetadatos(design_id);
        const diapositivasXml = generarDiapositivas(data);

        if (!metadatosXml || !diapositivasXml) {
            console.error("No se pudo generar el archivo XML.");
            return;
        }

        return createVideoclase(metadatosXml, diapositivasXml);
    } catch (error) {
        console.error("Error generando el XML:", error);
    }
};