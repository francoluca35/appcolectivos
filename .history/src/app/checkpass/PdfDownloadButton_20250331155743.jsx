"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfDownloadButton({ pasajero }) {
  const generarPDF = async () => {
    const doc = new jsPDF();

    // Cargar logo
    const logo = await loadImage("/Assets/logo.png");
    if (logo) {
      doc.addImage(logo, "PNG", 160, 10, 35, 15);
    }

    doc.setFontSize(16);
    doc.text(`Ficha del Pasajero con destino a ${pasajero.destino}`, 14, 20);

    // Tabla de datos principales
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
      headStyles: { fillColor: [255, 0, 0] },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 120 },
      },
    });

    // Obtener y validar array de pasajerosExtras
    const extras = Array.isArray(pasajero.pasajerosExtras) ? pasajero.pasajerosExtras : [];

    doc.setFontSize(14);
    doc.text("Pasajeros Adicionales", 14, doc.lastAutoTable.finalY + 10);

    if (extras.length > 0) {
      const extrasData = extras.map((extra, i) => [
        i + 1,
        extra.nombre || "-",
        extra.dni || "-",
      ]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [["#", "Nombre", "DNI"]],
        body: extrasData,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 163, 74] },
      });
    } else {
      doc.setFontSize(10);
      doc.text("No se registraron pasajeros adicionales.", 14, doc.lastAutoTable.finalY + 20);
    }

    doc.save(`pasajero-${pasajero.nombreCompleto || "info"}.pdf`);
  };

  // Cargar logo como base64
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
