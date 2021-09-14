import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useSlackApi from "../lib/useSlackApi";

export default function ConversationsList() {
  const conversations = useSlackApi("conversations.list?exclude_archived=true");

  return (
    <Container>
      {conversations.status === "loading" && <p>Loading...</p>}
      {conversations.status === "error" && <p>Error :(</p>}
      {conversations.status === "success" &&
        conversations.data.channels.map((channel) => {
          return (
            <Item key={channel.id} to={`/c/${channel.id}`}>
              #{channel.name}
            </Item>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 260px;
  padding: 0.5rem 0;
  border-right: 1px solid #ddd;
`;

const Item = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  color: black;

  &:focus {
    background: #f5f5f5;
  }

  &:active {
    background: #eee;
  }

  &.active {
    color: white;
    background: #333;
  }
`;
