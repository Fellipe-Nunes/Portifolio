import React from 'react'
import { DeleteUser } from '../../../services/user'

const Confirmation = (props) => {
    const deleteUser = async (value) => {
        if (value) {
            await DeleteUser(props.data.params._id)
        }
        props.fnc({
            isShow: false,
            params: {}
        })
    }

    return (
        <section className="boxConfirmation">
            <div className="confirmation">
                <div className="message">Voce deseja excluir o usuário {props.data.params.nome}</div>
                <div className="actions">
                    <button onClick={() => deleteUser(false)} className="cancel">NÃO</button>
                    <button onClick={() => deleteUser(true)} className="success">SIM</button>
                </div>
            </div>
        </section >
    )
}

export default Confirmation
