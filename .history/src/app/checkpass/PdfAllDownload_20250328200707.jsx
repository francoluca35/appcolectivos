// components/PdfAllDownload.jsx
'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PdfAllDownload({ data }) {
  const generarTodosPDF = () => {
    Object.entries(data).forEach(([destino, pasajeros]) => {
      const doc = new jsPDF();

      pasajeros.forEach((p, index) => {
        if (index > 0) doc.addPage();

        doc.setFontSize(16);
        doc.text("Ficha del Pasajero", 14, 20);

        const headers = [["Campo", "Valor"]];
        const body = [
          ["ID", p.id || "-"],
          ["Nombre completo", p.nombreCompleto],
          ["Dirección", p.direccion],
          ["Código Postal", p.codigoPostal],
          ["DNI", p.dni],
          ["Teléfono", p.telefono],
          ["Correo", p.correo],
          ["Origen", p.origen],
          ["Destino", p.destino],
          ["Localidad", p.localidad],
          ["Fecha desde", p.fechaDesde],
          ["Fecha hasta", p.fechaHasta],
          ["Hora de salida", p.horasalida],
          ["Hora de llegada", p.horallegada],
          ["Salida del micro turno", p.horario],
          ["Tipo de butaca", p.butaca],
          ["Cantidad", p.cantidad],
          ["Precio Unitario", p.precioUnitario],
          ["Método de Pago", p.metodoPago],
          ["Total", p.total],
          ["Fecha del Viaje", new Date(p.fechaViaje).toLocaleDateString("es-AR")],
          ["Fecha de Registro", new Date(p.fechaRegistro).toLocaleDateString("es-AR")]
        ];

        autoTable(doc, {
          startY: 30,
          head: headers,
          body: body,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [30, 144, 255] },
          alternateRowStyles: { fillColor: [245, 245, 245] }
        });
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