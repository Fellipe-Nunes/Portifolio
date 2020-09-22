import React from 'react'
import { useParams } from 'react-router-dom'


const messages = {
    '403': "Você não tem autorizacão",
    '500': "Ocorreu um erro, tente novamente"
}


const Error = () => {
    const { erro } = useParams()
    return (
        <h1>
            [{erro || 500}] -  {messages[erro] || messages['500']}
        </h1>
    )
}

export default Error
