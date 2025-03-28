// components/PdfDownloadButton.jsx
"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfDownloadButton({ pasajero }) {
  const generarPDF = () => {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(18);
    doc.text("Detalle del Pasajero", 14, 20);

    // Armar tabla
    const headers = [["Campo", "Valor"]];
    const data = Object.entries(pasajero).map(([key, value]) => [
      key,
      typeof value === "string" && value.includes("T")
        ? new Date(value).toLocaleDateString("es-AR")
        : String(value)
    ]);

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [26, 188, 156],
        textColor: 255,
        fontStyle: 'bold'
      },
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