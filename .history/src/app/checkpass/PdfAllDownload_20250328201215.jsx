'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PdfAllDownload({ data }) {
  const generarTodosPDF = () => {
    Object.entries(data).forEach(([destino, pasajeros]) => {
      const doc = new jsPDF();

      pasajeros.forEach((p, index) => {
        if (index !== 0) doc.addPage();

        doc.setFontSize(18);
        doc.text(`Ficha del Pasajero - ${destino}`, 14, 20);

        const campos = [
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
          head: [['Parámetro', 'Descripción']],
          body: campos,
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [60, 179, 113] }, // Verde suave
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
