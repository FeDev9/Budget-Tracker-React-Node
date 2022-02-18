const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const model = require('../models/authModel');



class AuthController {

    async register(req, res) {


        const { name, email, password, passwordConfirm } = req.body;


        if (!name || !email || !password || !passwordConfirm) {
            return res.json({
                "msg": "please fill the inputs",
                "error": 1
            })
        }

        const results = await model.getEmail({ email });

        if (results.length > 0) {
            return res.json({
                'msg': 'User alredy exists',
                'error': 1
            })
        }
        else if (password !== passwordConfirm) {
            return res.json({
                'msg': "Password don't match",
                'error': 1
            })
        }


        let hashedPassword = await bcrypt.hash(password, 8);

        const user = await model.addUser({ name, email, password: hashedPassword });
        return res.json({
            'msg': 'user added',
            'error': 0,
            'id': user.insertId
        })

    };

    async login(req, res) {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                'msg': 'Please provider email and password',
                'error': 1
            });
        }

        const results = await model.getUser({ email: email });

        if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {

            return res.json({
                'msg': 'Mail or password incorrect',
                'error': 1
            })

        } else {

            res.json(results[0]);

            // const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            //     expiresIn: process.env.JWT_EXPIRES_IN
            // });

            // console.log("This is token: " + token);

            // const cookieOptions = {
            //     expires: new Date(
            //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            //     ),
            //     httpOnly: true
            // }

            // res.status(201).json({
            //     id: id,
            //     name: results[0].name,
            //     email: results[0].email,
            //     token: token
            // })
        }
    };


}

module.exports = new AuthController();