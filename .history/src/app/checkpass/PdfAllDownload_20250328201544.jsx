'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PdfAllDownload({ data }) {
  const generarTodosPDF = async () => {
    const logo = await loadImage('/logo.png'); // Ruta del logo

    Object.entries(data).forEach(([destino, pasajeros]) => {
      const doc = new jsPDF();

      pasajeros.forEach((p, index) => {
        if (index !== 0) doc.addPage();

        // Agregar logo
        if (logo) {
          doc.addImage(logo, 'PNG', 160, 10, 35, 15); // X, Y, width, height
        }

        doc.setFontSize(16);
        doc.text(`Ficha del Pasajero con destino a ${destino}`, 14, 20);

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
          ["Hora de salida", p.horariosalida],
          ["Hora de llegada", p.horariollegada],
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
          headStyles: { fillColor: [60, 179, 113] },
        });
      });

      doc.save(`pasajeros-${destino}.pdf`);
    });
  };

  // Carga la imagen como base64
  const loadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
      img.src = url;
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
