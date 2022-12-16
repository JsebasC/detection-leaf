module.exports = {
    isLoggedIn(req, res,  next){ //metodo para validar si esta autenticado
        if(req.isAuthenticated() ){ //redirigimos 
            console.log(req.user);
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated() ){
            return next();
        }
        return res.redirect('/profile');
    }
};