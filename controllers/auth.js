const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(request, res = response) => {

    ///const emal = request.body.email;
    const { email, password } = request.body; //desestructuración

    try {

        const emailExist = await User.findOne({ email: email }); //devuelve el modelo
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email exist'
            });
        }

        const user = new User(request.body); /// El schema va a filtrar todos los campos del body

        //Crypt pasword
        const salt = bcrypt.genSaltSync(); ///salt significa que aunque sean passwords iguales el has va a ser diferente
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        ///jwt
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user: user,
            token: token,
        });

    } catch (error) {
        console.log(error);
        //error 500 propio del servidor
        res.status(500).json({
            ok: false,
            msg: error,
        });
    }



};

const loginUser = async(request, res = response) => {

    ///const emal = request.body.email;
    const { email, password } = request.body; //desestructuración

    try {

        const userDB = await User.findOne({ email: email }); //devuelve el modelo
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid'
            });
        }


        //Crypt pasword
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid'
            });
        }

        ///jwt
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token: token,
        });

    } catch (error) {
        console.log(error);
        //error 500 propio del servidor
        res.status(500).json({
            ok: false,
            msg: error,
        });
    }



};

const renewToken = async(resq, resp = response) => {

    const uid = resq.uid;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            resp.status(401).json({
                ok: false,
                msg: 'No existe el uid'
            });
        }

        const token = await generateJWT(uid);

        resp.json({
            ok: true,
            user: userDB,
            token: token,
        });

    } catch (error) {
        console.log(error);
        //error 500 propio del servidor
        resp.status(500).json({
            ok: false,
            msg: error,
        });
    }

}

module.exports = {
    renewToken,
    createUser,
    loginUser
};