import { useEffect, useState } from "react";
import axios from "axios";

const useVerViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchViajes = async () => {
    try {
      const res = await axios.get("/api/verviajes"); // 👈 asegúrate que coincida
      setViajes(res.data);
    } catch (err) {
      console.error("Error al obtener viajes", err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarViaje = async (id) => {
    try {
      await axios.delete(`/api/verviajes?id=${id}`);
      fetchViajes(); // recargar
    } catch (err) {
      console.error("Error al eliminar viaje", err);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  return { viajes, loading, eliminarViaje };
};

export default useVerViajes;
