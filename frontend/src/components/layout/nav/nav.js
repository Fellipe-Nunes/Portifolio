import React from "react";
import "./nav.css";
import history from "../../../config/history";
import { Button } from "reactstrap";
import styled from "styled-components";

const Nav = ({ name, to }) => {
  const changePage = () => history.push(to);

  return (
    <nav className="d-flex">
      <div className="title"> Lista de Usuários</div>
      <div className="action">
        <ButtonNav onClick={changePage}>{name}</ButtonNav>
      </div>
    </nav>
  );
};
export default Nav;

const ButtonNav = styled(Button)`
  background-color: green;
`;

export { ButtonNav };
