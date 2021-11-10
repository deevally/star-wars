import Axios from "axios";
import log from "../utils/logger";

async function GetRequest(Url) {
  try {
    const reqHeaders = {
      "Content-Type": "application/json",
    };

    const result = (
      await Axios.get(Url, {
        headers: reqHeaders,
      })
    ).data;

    return result;
  } catch (error) {
    log.error(error.response.data.Errors || error.response.data[0].Errors);
    return {
      statusCode: error.response.status,
      Message: error.response.data.Errors || error.response.data[0].Errors,
    };
  }
}

export default { GetRequest };
