const jwt = require('jsonwebtoken');

const validateJWT = (request, response, next) => {

    const token = request.header('x-token');

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No hay token en la petición',
        });
    }


    try {

        console.log(token);

        const { uid } = jwt.verify(token, process.env.JWT_SECRET); //payload
        request.uid = uid; //asignar el uid al request
        next();
    } catch (error) {
        response.status(401).json({
            ok: false,
            msg: 'No se ha podido validar el Token',
        });
    }


}

module.exports = {
    validateJWT
}