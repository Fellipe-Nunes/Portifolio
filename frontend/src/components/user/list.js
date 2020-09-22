import React, { useEffect, useState } from 'react'
import { DeleteUser, ListUser } from '../../services/user'
import Loading from '../loading/loading'
import Nav from '../../components/layout/nav/nav'
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';



const UserList = (props) => {

    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(false)
    const [confirmation, setConfirmation] = useState({
        isShow: false,
        params: {}
    })
    const getList = async () => {
        try {
            setloading(true)
            const usersAll = await ListUser()
            if (usersAll) {
                setUsers(usersAll.data)
            }
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    const editUser = (user) => props.history.push(`/edit/${user._id}`)

    const deleteUser = async () => {

        if (confirmation.params) {
            await DeleteUser(confirmation.params._id)
        }
        setConfirmation({
            isShow: false,
            params: {}
        })

        getList()
    }

    const Confirmation = () => {
        const toggle = () => setConfirmation(!confirmation.isShow);
        return (
            <Modal isOpen={confirmation.isShow} toggle={toggle} className="info">
                <ModalBody>
                    Você deseja excluir o usuário {(confirmation.params && confirmation.params.nome) || ""}
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={deleteUser}>SIM</Button>{' '}
                    <Button color="danger" onClick={toggle}>NÃO</Button>
                </ModalFooter>
            </Modal>
        )
    }

    const verifyIsEmpty = users.length === 0

    const sortList = (users) => {
        return users.sort((a, b) => {
            if (a.is_active < b.is_active) {
                return 1;
            }
            if (a.is_active > b.is_active) {
                return -1;
            }
            return 0;
        })
    }


    const setIcon = (conditional) => (
        <i className={`action fa fa-${conditional ? "check text-success" : "times text-danger"}`} />
    )
    const montarTabela = () => {
        const listSorted = sortList(users)

        const linhas = listSorted.map((user, index) => (
            <tr key={index} className={user.is_active ? "" : "table-danger"} >
                <td> {setIcon(user.is_active)}</td>
                <td> {setIcon(user.is_admin)}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                    <span onClick={() => editUser(user)} className="text-primary mx-1" >
                        <i className="action fa fa-edit"></i>
                    </span>
                    <span onClick={() => setConfirmation({ isShow: true, params: user })} className="text-danger  mx-1">
                        <i className="action fa fa-trash"></i>
                    </span>
                </td>
            </tr >
        ))

        return !verifyIsEmpty ? (
            <Table className="table table-striped table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>ATIVO</th>
                        <th>ADMIN</th>
                        <th>NOME</th>
                        <th>EMAIL</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {linhas}
                </tbody>
            </Table>
        ) : ""
    }



    useEffect(function () {
        getList()
    }, [])

    // useEffect(function () {
    //     getList()
    // }, [confirmation])
    //render
    return (
        <div>
            <Nav name="Novo" to="/create" />
            <Confirmation />
            <section>
                <div className="list_user">
                    <Loading show={loading} />
                    {montarTabela()}
                </div>
            </section>
        </div>

    )
}

export default UserList