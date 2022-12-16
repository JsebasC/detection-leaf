const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth') //importamos los metodos para verificar

router.get('/signup',isNotLoggedIn,(req, res)=>{ // utilizamos si no esta iniciado lo enviamos a registrarse
    res.render('auth/signup')
});

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup',{//cuando intenta registarse
    successRedirect: '/profile', // si se autentica
    failureRedirect: '/signup', // si falla se redirige
    failureFlash: true
}));

router.get('/signin',isNotLoggedIn, (req,res)=>{ //cuando inicia session
    res.render('auth/signin');
});

router.post('/signin',isNotLoggedIn, (req,res,next)=>{ //cuando inicia session
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile/profile');

});

router.get('/logout', (req, res)=>{
    req.logOut((err) =>{
        if (err) { return next(err); }
        res.redirect('/signin');
      }
    )
});

module.exports = router;