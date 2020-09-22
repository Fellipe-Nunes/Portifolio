import React from "react";
import { useHistory } from "react-router-dom";
import { removeToken, isAuthenticated } from "../../../config/auth";
import "./header.css";
import { Button } from "reactstrap";
import styled from "styled-components";

export default (props) => {
  const history = useHistory();

  const logout = () => {
    removeToken();
    history.push("/login");
  };

  const hasUser = () => {
    if (props.info && props.info.nome) {
      return (
        <>
          <i className="fa fa-user" /> {props.info.nome} |
        </>
      );
    }
  };

  return (
    <Header>
      <Title>{props.title}</Title>
      <div className="profile">
        {hasUser()}
        {isAuthenticated() ? (
          <Button size="sm" color="danger" className="logout" onClick={logout}>
            {" "}
            <i className="fa fa-sign-out"></i> Sair
          </Button>
        ) : (
          ""
        )}
      </div>
    </Header>
  );
};

//
// fn(styled)  + tag(html) + templateSring
const Header = styled.header.attrs({
  className: "d-flex",
  id: "teste",
})`
  background-color: ${(props) => (props.dark ? "#000" : "#033468")};
  padding: 35px;
  color: #fff;
`;

const Title = styled.div`
  color: #fff;
  justify-content: start;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
`;
