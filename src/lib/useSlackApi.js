import { useEffect, useState } from "react";
import axios from "axios";

export default function useSlackApi(apiMethod) {
  const [state, setState] = useState({status: "loading"});

  useEffect(() => {
    async function fetchData() {
      setState({status: "loading"});
      try {
        const response = await axios.get(
          "https://slack.com/api/" + 
            apiMethod + 
            (apiMethod.indexOf("?") < 0 ? "?" : "") + 
            "&token=" + process.env.REACT_APP_SLACK_TOKEN
          );
        if (!response.data.ok) {
          // Slack gives back errors with a 200 status code, so this is necessary
          throw new Error(response.data.error);
        }
        setState({ status: "success", data: response.data});
      } catch(error) {
        setState({ status: "error", error })
      }
    }

    fetchData();
  }, [setState, apiMethod]);

  return state;
}