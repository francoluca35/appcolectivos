"use client";

import { jsPDF } from "jspdf";

export default function PdfDownloadButton({ pasajero }) {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Detalle del Pasajero", 14, 20);

    const entries = Object.entries(pasajero);

    let y = 30;
    entries.forEach(([key, value]) => {
      const valor = typeof value === "string" && value.includes("T")
        ? new Date(value).toLocaleDateString("es-AR")
        : value;
      doc.text(`${key}: ${valor}`, 14, y);
      y += 8;
    });

    doc.save(`pasajero-${pasajero.nombreCompleto}.pdf`);
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
