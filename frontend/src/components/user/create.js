import React, { useState, useEffect } from "react";
import { createUser, showUserId, updateUser } from "../../services/user";
// import Loading from '../loading/loading'
import Alert from "../alert/index.js";
import Nav from "../layout/nav/nav";
import { useHistory, useParams } from "react-router-dom";
import jwt from "jsonwebtoken";
import { getToken } from "../../config/auth";
import { Button, FormGroup, Label, Input, CustomInput } from "reactstrap";
import "./user.css";

const UserCreate = (props) => {
  const [userIsAdmin, setUserIsAdmin] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [alert, setAlert] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const methodUser = isEdit ? updateUser : createUser;

  const [form, setForm] = useState({
    is_admin: false,
  });

  useEffect(() => {
    (async () => {
      const { user } = await jwt.decode(getToken());
      setUserIsAdmin(user.is_admin);
    })();
    return () => {};
  }, []);

  useEffect(() => {
    const getShowUser = async () => {
      const user = await showUserId(id);
      if (user.data.senha) {
        delete user.data.senha;
      }
      setForm(user.data);
    };

    if (id) {
      setisEdit(true);
      getShowUser();
    }
  }, [id]);

  const handleChange = (event) => {
    // const checked = event.target.value === 'on' ? true : false

    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const formIsValid = () => {
    return form.nome && form.email;
  };

  const submitForm = async (event) => {
    try {
      setIsSubmit(true);
      await methodUser(form);
      const is_admin = userIsAdmin ? form.is_admin : false;
      setForm({
        ...form,
        is_admin,
      });

      setAlert({
        type: "success",
        message: "Seu formulário foi enviado com sucesso",
        show: true,
      });
      setIsSubmit(false);

      setTimeout(() => history.push("/"), 3000);
    } catch (e) {
      setAlert({
        type: "error",
        message: "Ocorreu um erro no cadastro",
        show: true,
      });
      setIsSubmit(false);
    }
  };

  return (
    <React.Fragment>
      <Nav name="Lista" to="/" />
      <section>
        <Alert
          type={alert.type || ""}
          message={alert.message || ""}
          show={alert.show || false}
        />

        <div className="create_user">
          <div className="form_login">
            <FormGroup>
              <Label for="auth_nome">Nome</Label>
              <Input
                disabled={isSubmit}
                type="text"
                id="auth_nome"
                name="nome"
                onChange={handleChange}
                value={form.nome || ""}
                placeholder="Insira o seu nome"
              />
            </FormGroup>

            <FormGroup>
              <Label for="auth_email">Email</Label>
              <Input
                disabled={isSubmit || isEdit}
                type="email"
                id="auth_email"
                name="email"
                onChange={handleChange}
                value={form.email || ""}
                placeholder="Insira sua senha"
              />
            </FormGroup>

            <FormGroup>
              <Label for="auth_password">Senha</Label>
              <Input
                disabled={isSubmit}
                type="password"
                id="auth_password"
                name="senha"
                onChange={handleChange}
                value={form.senha || ""}
                placeholder={
                  isEdit ? `Atualize sua senha ` : "Informe sua senha"
                }
              />
            </FormGroup>

            <FormGroup>
              {userIsAdmin ? (
                <CustomInput
                  type="switch"
                  label="Ativar Usuário como administrador:"
                  name="is_admin"
                  id="is_admin"
                  onChange={handleChange}
                  checked={(!isEdit ? true : form.is_admin) || false}
                />
              ) : (
                ""
              )}
              <CustomInput
                type="switch"
                label="Usuário ativo ?"
                id="is_active"
                name="is_active"
                onChange={handleChange}
                checked={(!isEdit ? true : form.is_active) || false}
              />
            </FormGroup>

            <Button
              color="primary"
              disabled={!formIsValid()}
              onClick={submitForm}
            >
              {isEdit ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
          <br />
          {/* <Loading show={isSubmit}/> */}
          {isSubmit ? <div>Carregando....</div> : ""}
        </div>

      </section>
    </React.Fragment>
  );
};

export default UserCreate;
