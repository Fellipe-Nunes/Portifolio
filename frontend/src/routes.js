import React from 'react'
import { isAuthenticated } from './config/auth';
import {
    Switch,
    Route,
    Redirect,
    Router
} from "react-router-dom";
import ErrorHandler from './views/errors/error';
import history from './config/history';
import viewUser from './views/User';
import viewLogin from './views/Login';


const CustomRoute = ({ ...rest }) => {
    if (!isAuthenticated()) {
        return <Redirect to='/login' />
    }
    return <Route {...rest} />
}




const Routers = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/login" component={viewLogin} />
            <Route exact path="/erro/:erro" component={ErrorHandler} />
            <CustomRoute path="/" component={viewUser} />
        </Switch>
    </Router>
)

export default Routers;










// const routes = {
//     'List': {
//         component: UserList,yarn
//         showMenu: true,
//         actions: {
//             name: 'Novo',
//             to: "Create"
//         }
//     },
//     'Create': {
//         component: UserCreate,
//         showMenu: true,
//         actions: {
//             name: 'Lista',
//             to: "List"
//         }
//     },
//     'Login': {
//         component: Login,
//         showMenu: false,
//     },
// }

// export default routes;