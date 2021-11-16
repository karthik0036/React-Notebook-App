const express = require('express')
const User = require('../models/User')
const router = express.Router()
// Data validation using express validation
const { body, validationResult } = require('express-validator');
const { response } = require('express');
//for password protection from hackers(salt,pepper,hash)
const bcrypt = require('bcryptjs');
//provide user a Authentication token after login
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')



// ROUTE1-create user using:POST-'/api/auth/createuser' -no login required
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 })
],

    async (req, res) => {
        let success = false;
        //return bad requests or error if there are errors:express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            //check user with this email exists or not
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return response.status(404).json({ success, error: "error error! user with email should be unique" })
            }

            const salt = await bcrypt.genSaltSync(10);
            const secPwd = await bcrypt.hashSync(req.body.password, salt);


            //else create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPwd,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, 'shhhhh');
            success = true;
            res.json({ success, authtoken })
        }
        catch (error) {
            console.error(error.message)
            response.status(500).send("Internal server error occured")
        }

        // .then(user => res.json(user))
        //     .catch(err => {
        //         console.log(err)
        //         res.json({ error: "error error! email should be unique", message: err.message })
        //     });


    })

//ROUTE2- Authenticate user using :POST-'/api/auth/login' - login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must not be blank').exists()],

    async (req, res) => {
        let success = false;
        //return bad requests or error if there are errors:express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            //check user with this email exists or not
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "please login with correct credentials" })
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success = false;
                return res.status(404).json({ error: "please login with correct credentials" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, 'shhhhh');
            success = true;
            res.json({ success, authtoken })
        }
        catch (error) {
            console.error(error.message)
            response.status(500).send("Internal server error occured")
        }

    })

//ROUTE3- get user Details who loggd in :POST-'/api/auth/getuser' - login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message)
        response.status(500).send("Internal server error occured")
    }
})

module.exports = router








