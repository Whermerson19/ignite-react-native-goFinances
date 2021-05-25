import React from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://avatars.githubusercontent.com/u/68500665?v=4" }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <Username>Whermerson</Username>
            </User>
          </UserInfo>
        </UserWrapper>
      </Header>
    </Container>
  );
}
