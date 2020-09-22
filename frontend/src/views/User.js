import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { List as UserList, Create as UserCreate } from '../components/user/'
import jwt from 'jsonwebtoken'

import { Route, Switch, Redirect } from "react-router-dom";
import { getToken } from '../config/auth';

const User = (props) => {
    // console.log('props', props)
    const [useinfo, setuseinfo] = useState({})
    const [userIsAdmin, setUserIsAdmin] = useState({})
    useEffect(() => {
        (async () => {
            const { user } = await jwt.decode(getToken())
            setuseinfo(user)
            setUserIsAdmin(user.is_admin)
        })()
        return () => { }
    }, [])

    const AdminRoute = ({ ...rest }) => {
        if (rest.admin) {
            if (!userIsAdmin) {
                return <Redirect to="/403" />
            }
            return <Route {...rest} basename={props.match.path} />
        }

        return <Route {...rest}  basename={props.match.path} />
    }



    return (
        <Layout info={useinfo}>
            <Switch>
                <AdminRoute exact match path="/" component={UserList} />
                <AdminRoute admin exact path={"/create"} component={UserCreate} />
                <AdminRoute admin exact path={"/edit/:id"} component={UserCreate} />
                <Route exact path={"/403"} component={() => <h1>Você não tem Permissão</h1>} /> 
            </Switch>
        </Layout>
    )
}

export default User





