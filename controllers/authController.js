const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authController {

    user_register = async (req, res) => {

        let { name, email, password } = req.body
        email = email.trim()
        password = password.trim()
        name = name.trim()
        try {
            const get_user = await userModel.findOne({ email }).select('+password')

            if (get_user) {
                return res.status(404).json({ message: "Email already exit" })
            } else {
                const user = await userModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 9)
                })
                const token = await jwt.sign({
                    name: user.name,
                    email: user.email,
                    _id: user.id
                }, 'farid', {
                    expiresIn: '2d'
                })

                return res.status(201).json({ message: "Signup success", token })
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: "Internal server error" })
        }
    }


    user_login = async (req, res) => {
        let { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email }).select('+password');
    
            if (user) {
                const match = await bcrypt.compare(password, user.password);
    
                if (match) {
                    const token = await jwt.sign(
                        {
                            name: user.name,
                            email: user.email,
                            _id: user.id,
                        },
                        'farid',
                        {
                            expiresIn: '2d',
                        }
                    );
    
                    // Devolver también el email y el name
                    return res.status(200).json({
                        message: "Signin success",
                        token,
                        email: user.email,
                        name: user.name,
                    });
                } else {
                    return res.status(404).json({ message: "Password invalid" });
                }
            } else {
                return res.status(404).json({ message: "Email doesn't exist" });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
    
}

module.exports = new authController()