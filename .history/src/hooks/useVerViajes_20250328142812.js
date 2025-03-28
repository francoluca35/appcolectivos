// hooks/useVerViajes.js
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // 📦 Recomendado para fechas (npm i dayjs)

const useVerViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchViajes = async () => {
    try {
      const res = await axios.get("/api/verviajes");
      const data = res.data;

      const hoy = dayjs().startOf("day");

      // Buscar viajes vencidos
      const vencidos = data.filter((viaje) => {
        const fechaHasta = dayjs(viaje.fechaHasta);
        return fechaHasta.isBefore(hoy);
      });

      // Eliminar los vencidos
      for (const viaje of vencidos) {
        await eliminarViajeSilencioso(viaje._id);
      }

      // Filtrar y setear los que siguen vigentes
      const vigentes = data.filter((viaje) => {
        const fechaHasta = dayjs(viaje.fechaHasta);
        return !fechaHasta.isBefore(hoy);
      });

      setViajes(vigentes);
    } catch (err) {
      console.error("Error al obtener viajes", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar visible (con recarga)
  const eliminarViaje = async (id) => {
    try {
      await axios.delete(`/api/verviajes?id=${id}`);
      fetchViajes(); // recargar luego de eliminar
    } catch (err) {
      console.error("Error al eliminar viaje", err);
    }
  };

  // Eliminar silenciosamente (sin recargar)
  const eliminarViajeSilencioso = async (id) => {
    try {
      await axios.delete(`/api/verviajes?id=${id}`);
    } catch (err) {
      console.error("Error al eliminar viaje vencido", err);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  return { viajes, loading, eliminarViaje };
};

export default useVerViajes;
