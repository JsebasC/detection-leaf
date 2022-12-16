const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth')

router.get('/detection',isLoggedIn,(req, res)=>{ //cuando le doy click al menu de detenction comprueba la autenticacion
    res.render('detection/detection');
});

module.exports = router;