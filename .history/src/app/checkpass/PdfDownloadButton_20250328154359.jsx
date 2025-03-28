// components/PdfDownloadButton.jsx
"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfDownloadButton({ pasajero }) {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Ficha del Pasajero`, 14, 20);

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
      horasalida: "Hora de salida",
      horario: "Turno",
      horallegada: "Hora de llegada",
      butaca: "Tipo de butaca",
      cantidad: "Cantidad",
      precioUnitario: "Precio Unitario",
      metodoPago: "Método de Pago",
      total: "Total",
      fechaViaje: "Fecha del Viaje",
      fechaRegistro: "Fecha de Registro"
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
      headStyles: { fillColor: [33, 150, 243] },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 120 },
      },
    });

    doc.save(`pasajero-${pasajero.nombreCompleto || "info"}.pdf`);
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
