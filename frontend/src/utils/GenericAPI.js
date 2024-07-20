import localforage from "localforage";
// import axios from "./axios";
import axios from "axios";

export default class GenericAPI {
  async graphQL(url, queryText, variablesData) {
    let token = await localforage.getItem("access_token");
    try {
      const response = await axios.post(
        url,
        {
          query: queryText,
          variables: variablesData,
        },
        {
          headers: {
            Authorization: "JWT " + token,
          },
        }
      );

      return { code: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error.response.status);
        return { code: error.response.status, data: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return { code: -1, data: error.request };
      } else if (error === "SendLogin") {
        return { code: -2, data: "Send user to Login" };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { code: -3, data: error.message };
      }
    }
  }

  async get(url, params = null) {
    try {
      const token = await localforage.getItem("access_token");
      const response = await axios.get(url, {
        params: params,
        headers: {
          Authorization: "JWT " + token,
        },
      });

      return { code: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error.response.status);
        return { code: error.response.status, data: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return { code: -1, data: error.request };
      } else if (error === "SendLogin") {
        return { code: -2, data: "Send user to Login" };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { code: -3, data: error.message };
      }
    }
  }

  async post(url, body) {
    try {
      const token = await localforage.getItem("access_token");

      const response = await axios.post(url, body, {
        headers: {
          Authorization: "JWT " + token,
        },
      });

      return { code: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error.response.status);
        return { code: error.response.status, data: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return { code: -1, data: error.request };
      } else if (error === "SendLogin") {
        return { code: -2, data: "Send user to Login" };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { code: -3, data: error.message };
      }
    }
  }

  async put(url, body, contentType = "application/json") {
    try {
      const token = await localforage.getItem("access_token");

      const response = await axios.put(url, body, {
        headers: {
          Authorization: "JWT " + token,
          "Content-Type": contentType,
        },
      });

      return { code: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error.response.status);
        return { code: error.response.status, data: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return { code: -1, data: error.request };
      } else if (error === "SendLogin") {
        return { code: -2, data: "Send user to Login" };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { code: -3, data: error.message };
      }
    }
  }

  async delete(url) {
    try {
      const token = await localforage.getItem("access_token");

      const response = await axios.delete(url, {
        headers: {
          Authorization: "JWT " + token,
        },
      });

      return { code: response.status, data: response.data };
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error.response.status);
        return { code: error.response.status, data: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return { code: -1, data: error.request };
      } else if (error === "SendLogin") {
        return { code: -2, data: "Send user to Login" };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { code: -3, data: error.message };
      }
    }
  }
}
