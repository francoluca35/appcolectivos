// components/PdfAllDownload.jsx
'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PdfAllDownload({ data }) {
  const generarTodosPDF = () => {
    Object.entries(data).forEach(([destino, pasajeros]) => {
      const doc = new jsPDF();
      doc.setFontSize(16);
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
        "Cantidad",
        "Precio Unitario",
        "Total",
        "Nombre Completo",
        "DNI",
        "Teléfono",
        "Correo",
        "Dirección",
        "Código Postal",
        "Método de Pago",
        "Fecha Viaje",
        "Fecha Registro"
      ]];

      const body = pasajeros.map(p => [
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
        body: body,
        styles: { fontSize: 6 },
        headStyles: { fillColor: [52, 152, 219] }
      });

      doc.save(`pasajeros-${destino}.pdf`);
    });
  };

  return (
    <button
      onClick={generarTodosPDF}
      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded transition"
    >
      Descargar PDF {Object.keys(data).length > 1 ? "por destino" : ""}
    </button>
  );
}
