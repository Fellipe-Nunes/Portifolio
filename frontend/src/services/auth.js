const { clientHttp } = require("../config/config");

const authentication = (data) => clientHttp.post('/auth', data)


export {
    authentication
}