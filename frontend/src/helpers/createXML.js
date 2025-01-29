import api from "../utils/api";
import { saveAs } from 'file-saver'; // Instala esta librería con `npm install file-saver`
import xmlFormatter from 'xml-formatter';

export const createMetadatos = async (design_id) => {
    try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const userName = localStorage.getItem("user_name") || "USUARIO";
        const title = data.design?.title || "Ingresa el título";
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
        console.error('Error fetching designs:', error);
    }
};

// 📌 Generar el contenido de las diapositivas
function generarDiapositivas(data) {
    let xml = `<Contenido>\n`;

    data.components.forEach((slide) => {
        let disposicion = obtenerDisposicion(slide.components);
        let titulo = obtenerTitulo(disposicion);

        xml += `    <Diapositiva disposicion="${disposicion}" titulo="${titulo}">\n`;

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
    });

    xml += `</Contenido>`;
    return xml;
}

// 📌 Determinar el tipo de diapositiva
function obtenerDisposicion(components) {
    const tipoSlide = components.find(c => c.type_slide)?.type_slide || 1;
    const tipos = {
        1: "individual",
        2: "titulo",
        3: "cuarteto",
        8: "duo-vertical",
        9: "duo-horizontal"
    };
    return tipos[tipoSlide] || "individual";
}

// 📌 Asignar títulos correctos a las diapositivas
function obtenerTitulo(disposicion) {
    const titulos = {
        "individual": "Diapositiva Individual",
        "titulo": "Diapositiva de Título",
        "duo-vertical": "Diapositiva Duo-Vertical",
        "duo-horizontal": "Diapositiva Duo-Horizontal"
    };
    return titulos[disposicion] || "Diapositiva Sin Título";
}

// 📌 Determinar la justificación en base al tipo de contenido
function determinarJustificacion(component) {
    if (component.type === "title" || component.type === "text") return "centro";
    if (component.type === "image") return "centro";
    if (component.type === "code") return "centro";
    return "centro";
}

// 📌 Generar contenido de cada componente
function generarContenido(component) {
    switch (component.type) {
        case "title":
        case "text":
            return `<texto>${component.title}</texto>`;
        case "image":
            return `<imagen url="${component.image}" descripcion=""/>`;
        case "code":
            return `<codigo>\n    ${component.title.replace(/\n/g, "\n    ")}\n</codigo>`;
        default:
            return "";
    }
}

// 📌 Función para ensamblar el XML completo
const createVideoclase = (metadatos, diapositivas) => {
    const xmlVersion = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlFinal = `
${xmlVersion}
<Videoclase>
${metadatos}
${diapositivas}
</Videoclase>`.trim();

    // 📌 Formatear el XML con la indentación correcta
    const formattedXml = xmlFormatter(xmlFinal, {
        indentation: '    ', // Espacios por nivel
        collapseContent: false // No colapsar contenido dentro de etiquetas
    });

    return formattedXml;
};

// 📌 Guardar el XML como archivo
const saveXmlFile = (content, fileName) => {
    const blob = new Blob([content], { type: 'application/xml' });
    saveAs(blob, fileName);
};

// 📌 Función principal para crear el XML
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

        const xmlComplete = createVideoclase(metadatosXml, diapositivasXml);
        saveXmlFile(xmlComplete, `videoclase_${design_id}.xml`);
    } catch (error) {
        console.error("Error generando el XML:", error);
    }
};
