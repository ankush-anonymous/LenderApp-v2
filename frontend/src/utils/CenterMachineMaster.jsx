import { useState } from "react";
import GeneriAPI from "./GenericAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useMachineMaster() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiObject = new GeneriAPI();

  return {
    loading,

    async get(page, page_size, get_options) {
      let params = { page: page, page_size: page_size };

      setLoading(true);
      const response = await apiObject.get(
        `${process.env.REACT_APP_BASE_URL}/api/Center`,
        params
      );
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },

    async write(data, isNew) {
      let url = "";
      setLoading(true);
      console.log(data);
      let response;
      if (isNew === true) {
        url = `${process.env.REACT_APP_BASE_URL}/api/Center/`;
        response = await apiObject.post(url, data);
      } else {
        url = `${process.env.REACT_APP_BASE_URL}/api/Center/` + data.uuid;
        response = await apiObject.put(url, data);
      }
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },

    async remove(uuid) {
      setLoading(true);
      const response = await apiObject.delete(
        `${process.env.REACT_APP_BASE_URL}/api/Center/` + uuid
      );
      setLoading(false);

      if (response.code === -2) {
        navigate("/");
      }

      return response;
    },
  };
}
