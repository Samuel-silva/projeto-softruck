import { useEffect, useState } from "react";

import api from ".";

function useFetchVehicle() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await api.get()
      setData(resp.data);
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    fetchData();
  }, [])

  return { data, erro, loading }
}

export { useFetchVehicle };
