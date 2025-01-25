import api from "../utils/api";
import { saveAs } from 'file-saver'; // Instala esta librería con `npm install file-saver`
import xmlFormatter from 'xml-formatter';

export const createMetadatos = async (design_id) => {
    try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const userName = localStorage.getItem("user_name") || "USUARIO";
        const title = data.design?.title || "Default Title";
        const updatedAt = data.design?.updatedAt || "Default Date";

        const xmlMetadatos = `
    <Metadatos>
        <SoftwareVersion>1.0</SoftwareVersion>
        <Titulo>${title}</Titulo>
        <Autoria>${userName}</Autoria>
        <Fecha>${updatedAt}</Fecha>
    </Metadatos>`.trim();   
console.log(xmlMetadatos)
        return xmlMetadatos
        
    } catch (error) {
        console.error('Error fetching designs:', error);
    }
    
};

const createVideoclase = (metadatos) => {
    const xmlVersion = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlFinal = `
${xmlVersion}
<Videoclase>
${metadatos}
</Videoclase>`.trim();

    // Formatear el XML final para asegurarnos de la indentación correcta
    const formattedXml = xmlFormatter(xmlFinal, {
        indentation: '    ', // Espacios por nivel
        collapseContent: true // Mantener el contenido en línea si es corto
    });

    return formattedXml;
};

const saveXmlFile = (content, fileName) => {
    const blob = new Blob([content], { type: 'application/xml' });
    saveAs(blob, fileName);
};

export const createXml = async (design_id) => {
    const metadatosXml = await createMetadatos(design_id);
    if (!metadatosXml) {
        console.error("No se pudo generar el archivo XML debido a un error en los metadatos.");
        return;
    }

    const xmlComplete = createVideoclase(metadatosXml);
    saveXmlFile(xmlComplete, `videoclase_${design_id}.xml`);
};
