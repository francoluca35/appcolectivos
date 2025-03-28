"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfDownloadButton({ pasajero }) {
  const generarPDF = async () => {
    const doc = new jsPDF();

    // Cargar imagen del logo
    const logo = await loadImage("/Assets/logo.png"); // Asegúrate de que esté en /public/logo.png
    if (logo) {
      doc.addImage(logo, "PNG", 160, 10, 35, 15); // (x, y, width, height)
    }

    doc.setFontSize(16);
    doc.text(`Ficha del Pasajero con destino a ${pasajero.destino}`, 14, 20);

    const campos = {
      id: "ID",
      nombreCompleto: "Nombre completo",
      direccion: "Dirección",
      codigoPostal: "Código Postal",
      dni: "DNI",
      telefono: "Teléfono",
      correo: "Correo",
      origen: "Origen",
      destino: "Destino",
      localidad: "Localidad",
      fechaDesde: "Fecha desde",
      fechaHasta: "Fecha hasta",
      horariosalida: "Hora de salida",
      horariollegada: "Hora de llegada",
      horario: "Salida del micro turno",
      butaca: "Tipo de butaca",
      cantidad: "Cantidad",
      precioUnitario: "Precio Unitario",
      metodoPago: "Método de Pago",
      total: "Total",
      fechaViaje: "Fecha del Viaje",
      fechaRegistro: "Fecha de Registro",
    };

    const data = Object.entries(campos).map(([key, label]) => {
      let valor = pasajero[key];
      if (key === "fechaViaje" || key === "fechaRegistro") {
        valor = new Date(valor).toLocaleDateString("es-AR");
      }
      return [label, valor ?? "-"];
    });

    autoTable(doc, {
      startY: 30,
      head: [["Campo", "Valor"]],
      body: data,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 0, 0] }, // rojo fuerte
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 120 },
      },
    });

    doc.save(`pasajero-${pasajero.nombreCompleto || "info"}.pdf`);
  };

  // Función para cargar imagen en base64
  const loadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  return (
    <button
      onClick={generarPDF}
      className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
    >
      Descargar PDF
    </button>
  );
}
