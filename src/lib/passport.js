const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");


//se utiliza para autenticar a los usuarios en una aplicación basada en Node.js usando sus credenciales de inicio de sesión y contraseña.
// Esta estrategia forma parte del paquete de autenticación passport.js,
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const rows = await pool.query('SELECT * FROM users WHERE username = ?',[username]);
    if(rows.length>0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Welcome ' +user.username));
        } else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    } else {
        return done(null, false, req.flash('message','The User does not exists'));
  }
  
  // Verificar las credenciales del usuario aquí
    // Si las credenciales son válidas, llama a done() con el usuario
    // Si las credenciales son inválidas, llama a done(null, false)
    // Si hay un error, llama a done(err)
}
));


//utilizando la estrategia para registrarse
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameFiel: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const {email} = req.body;  
      const newUser = {
        username,
        password,
        email        
      };
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", [newUser]);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done)=>{
    done(null, user.id);
}); 

passport.deserializeUser(async (id, done)=>{
    const row = await pool.query('SELECT * FROM users Where id = ?',[id]);
    done(null, row[0])
})