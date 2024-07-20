import { useState } from "react";
import GeneriAPI from "./GenericAPI";
import { useNavigate } from "react-router-dom";

export default function useMachineMaster() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiObject = new GeneriAPI();

  return {
    loading,

    async get(page, page_size, get_options) {
      let params = { page: page, page_size: page_size };
      if (get_options) params["options"] = "1";

      setLoading(true);
      const response = await apiObject.get("/api/machine_master", params);
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },

    async write(data, isNew) {
      let url = "";
      if (isNew === true) url = "/api/machine_master";
      else url = "/api/machine_master/" + data.uuid;

      setLoading(true);
      const response = await apiObject.put(url, data);
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },

    async remove(uuid) {
      setLoading(true);
      const response = await apiObject.delete("/api/machine_master/" + uuid);
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },
  };
}
