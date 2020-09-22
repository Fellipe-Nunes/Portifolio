import { clientHttp } from '../config/config.js'

const createUser = (data) => clientHttp.post(`/user`, data)

const updateUser = (data) => clientHttp.patch(`/user/${data._id}`, data)
// TODO: Verificar no back  a atualização

const ListUser = () => clientHttp.get(`/user`)

const DeleteUser = (id) => clientHttp.delete(`/user/${id}`)

const showUserId = (id) => clientHttp.patch(`/user/${id}`)

export {
    createUser,
    ListUser,
    DeleteUser,
    showUserId,
    updateUser
}