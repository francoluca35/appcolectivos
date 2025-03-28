// hooks/useCheckPass.js
import { useEffect, useState } from "react";
import axios from "axios";

const useCheckPass = () => {
  const [pasajeros, setPasajeros] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPasajeros = async () => {
    try {
      const res = await axios.get("/api/check-pass");
      setPasajeros(res.data);
    } catch (err) {
      console.error("Error al obtener pasajeros", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasajeros();
  }, []);

  return { pasajeros, loading };
};

export default useCheckPass;
