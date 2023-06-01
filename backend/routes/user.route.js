const express = require('express');
const router = express.Router();
const User=require("../Models/user")
const bcrypt = require('bcrypt')
const nodemailer=require('nodemailer')
const {uploadFile}=require('../middleware/uploadfile')

var transporter=nodemailer.createTransport({
    service:'gmail',

    auth:{
        user:'esps421@gmail.com',
        pass:'lnrqjuzysshlrpem'
    },
   tls:{
    rejectUnauthorized:false
   } 
})
const jwt = require('jsonwebtoken')
// créer un nouvel utilisateur
router.post('/register',uploadFile.single("avatar"), async (req, res) => {
    try {
    let { email, password, firstname, lastname } = req.body
    const avatar=req.file.filename
    const user = await User.findOne({ email })
    if (user) return res.status(404).send({ success: false, message:
    "User already exists" })
    const newUser = new User({ email, password, firstname, lastname, avatar })
    const createdUser = await newUser.save()
    
    // Envoyer l'e-mail de confirmation de l'inscription
var mailOption ={
    from: '"verify your email " <esps421@gmail.com>',
    to: newUser.email,
    subject: 'vérification your email ',
    html:`<h2>${newUser.firstname}! thank you for registreting on our website</h2>
    <h4>please verify your email to procced.. </h4>
    <a
    href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">click
    here</a>`
    }
    transporter.sendMail(mailOption,function(error,info){
    if(error){
    console.log(error)
    }
    else{
    console.log('verification email sent to your gmail account ')
    }
    })

    return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })
    } catch (err) {
    console.log(err)
    res.status(404).send({ success: false, message: err })
    }
    });
    // afficher la liste des utilisateurs.
router.get('/', async (req, res, )=> {
    try {
    const users = await User.find();
    res.status(200).json(users);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
    router.get('/status/edit', async (req, res) => {
        // exemple :status/edit?email="yemna@gmail.com"(c'est une requete)
        try {
            let email=req.query.email
            console.log(email)
        
        let user = await User.findOne({email})
        user.isActive = !user.isActive
        user.save()
        res.status(200).send({ success: true, user })
        } catch (err) {
        return res.status(404).send({ success: false, message: err })
        }
        })

        // se connecter
router.post('/login', async (req, res) => {
    try {
    let { email, password } = req.body
    if (!email || !password) {
        return res.status(404).send({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({ email
        }).select('+password').select('+isActive')
        if (!user) {
        return res.status(404).send({ success: false, message: "Account doesn't exists" })
        } else {
        let isCorrectPassword = await bcrypt.compare(password, user.password)
        if (isCorrectPassword) {

        delete user._doc.password
        if (!user.isActive) return res.status(200).send({ success:
        false, message: 'Your account is inactive, Please contact your administrator' })
        
const token = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);
        return res.status(200).send({ success: true,user, token,refreshToken })
        } else {
            return res.status(404).send({ success: false, message:
                "Please verify your credentials" })
                }
                }
                } catch (err) {
                return res.status(404).send({ success: false, message: err.message
                })
                }
                });
                //Access Token
const generateAccessToken=(user) =>{
    return jwt.sign ({ iduser: user._id, role: user.role },
    process.env.SECRET, { expiresIn: '60s'})
    }
    // Refresh
    function generateRefreshToken(user) {
    return jwt.sign ({ iduser: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y'})
    }
//Refresh Route
router.post('/refreshToken', async (req, res, )=> {
    console.log(req.body.refreshToken)
    const refreshtoken = req.body.refreshToken;
    if (!refreshtoken) {
    return res.status(404).send({success: false, message: 'Token Not Found'
    });
    }
    else {
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
    
   
     if (err) { console.log(err)
    return res.status(406).send({ success: false,message:
    'Unauthorized' });
    }
    else {
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log("token-------",token);
    res.status(200).send({success: true,
    token,
    refreshToken
    })
    }
    });
    }
    });    
                
    
    module.exports = router;