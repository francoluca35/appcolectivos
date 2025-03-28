// components/PdfAllDownload.jsx
'use client';

import { jsPDF } from 'jspdf';

export default function PdfAllDownload({ data }) {
  const generarTodosPDF = () => {
    Object.entries(data).forEach(([destino, pasajeros]) => {
      const doc = new jsPDF();
      doc.setFontSize(16);

      pasajeros.forEach((p, i) => {
        if (i > 0) doc.addPage();

        doc.text(`Pasajero: ${p.nombreCompleto}`, 14, 20);

        const fields = [
          ['ID', p.id || '-'],
          ['Origen', p.origen],
          ['Destino', p.destino],
          ['Localidad', p.localidad],
          ['Horario', p.horario],
          ['Salida', p.horasalida],
          ['Llegada', p.horallegada],
          ['Desde', p.fechaDesde],
          ['Hasta', p.fechaHasta],
          ['Butaca', p.butaca],
          ['Cantidad', p.cantidad],
          ['Precio Unitario', `$${p.precioUnitario}`],
          ['Total', `$${p.total}`],
          ['Nombre Completo', p.nombreCompleto],
          ['DNI', p.dni],
          ['Teléfono', p.telefono],
          ['Correo', p.correo],
          ['Dirección', p.direccion],
          ['Código Postal', p.codigoPostal],
          ['Método de Pago', p.metodoPago],
          ['Fecha Viaje', new Date(p.fechaViaje).toLocaleDateString("es-AR")],
          ['Fecha Registro', new Date(p.fechaRegistro).toLocaleDateString("es-AR")]
        ];

        fields.forEach(([label, value], idx) => {
          doc.setFontSize(11);
          doc.text(`${label}: ${value}`, 14, 30 + idx * 8);
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
