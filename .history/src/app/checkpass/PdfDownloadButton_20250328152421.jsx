// components/PdfDownloadButton.jsx
"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfDownloadButton({ destino, pasajeros }) {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Pasajeros - ${destino}`, 14, 20);

    const headers = [[
      "ID",
      "Origen",
      "Destino",
      "Localidad",
      "Horario",
      "Salida",
      "Llegada",
      "Desde",
      "Hasta",
      "Butaca",
      "Cant.",
      "P.Unit.",
      "Total",
      "Nombre",
      "DNI",
      "Tel",
      "Correo",
      "Dirección",
      "Cod. Postal",
      "Pago",
      "F.Viaje",
      "F.Registro"
    ]];

    const data = pasajeros.map(p => [
      p.id || "-",
      p.origen,
      p.destino,
      p.localidad,
      p.horario,
      p.horasalida,
      p.horallegada,
      p.fechaDesde,
      p.fechaHasta,
      p.butaca,
      p.cantidad,
      p.precioUnitario,
      p.total,
      p.nombreCompleto,
      p.dni,
      p.telefono,
      p.correo,
      p.direccion,
      p.codigoPostal,
      p.metodoPago,
      new Date(p.fechaViaje).toLocaleDateString("es-AR"),
      new Date(p.fechaRegistro).toLocaleDateString("es-AR")
    ]);

    autoTable(doc, {
      startY: 30,
      head: headers,
      body: data,
      styles: { fontSize: 6 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(`pasajeros-${destino}.pdf`);
  };

  return (
    <button
      onClick={generarPDF}
      className="mt-3 bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition"
    >
      Descargar PDF
    </button>
  );
}