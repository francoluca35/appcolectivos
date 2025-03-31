import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const useVerViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchViajes = async () => {
    try {
      const res = await axios.get("/api/verviajes");
      const data = res.data;

      const ahora = dayjs();

      const vigentes = [];

      for (const viaje of data) {

        const fechaCompleta = dayjs(`${viaje.fechaHasta}T${viaje.horaLlegada}`);


        const vencimiento = fechaCompleta.add(3, "minute");

        if (vencimiento.isBefore(ahora)) {

          await eliminarViajeSilencioso(viaje._id);
        } else {

          vigentes.push(viaje);
        }
      }

      setViajes(vigentes);
    } catch (err) {
      console.error("Error al obtener viajes", err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarViaje = async (id) => {
    try {
      await axios.delete(`/api/verviajes?id=${id}`);
      fetchViajes();
    } catch (err) {
      console.error("Error al eliminar viaje", err);
    }
  };

  const eliminarViajeSilencioso = async (id) => {
    try {
      await axios.delete(`/api/verviajes?id=${id}`);
      await axios.post("/api/contadorviajes"); // Incrementar contador histórico
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
