import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import axios from "axios";

export default function ConversationThread() {
  const { channel = "" } = useParams();

  const [history, setHistory] = useState({status: "loading"});

  useEffect(() => {
    async function fetchData() {
      setHistory({ status: "loading"});
      try {
        const response = await axios.get("https://slack.com/api/conversations.history?channel=" +
        encodeURIComponent(channel) +
        "&token=" +
        process.env.REACT_APP_SLACK_TOKEN)
        if (!response.data.ok) {
          // slack gives back errors with 200 status code, so this is necessary
          throw new Error(response.data.error);
        }
        setHistory({status: "success", data: response.data});
      } catch (error) {
        setHistory({status: "error", error})
      }
    }

    fetchData();
  }, [setHistory, channel]);

  return (
    <Container>
      <p>Channel: #{channel}</p>
      {history.status === "loading" && <p>Loading...</p>}
      {history.status === "error" && <p>Error :(</p>}
        {history.status === "success" && history.data.messages.map(message => {
          if (message.type !== "message") {
            return null;
          }
          return (
            <Message text={message.text} sender="(Unknown)" sentAt={message.ts} />
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0 auto;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
