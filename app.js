const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const session = require('express-session');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
const pageRouter = require('./router/pageAdminRouter');
//const AdminRouter = require('./router/adminRouter');
const { json } = require('body-parser');
require('dotenv').config();
require('./db/connectDB');


const publicDirectoryPath= path.join(__dirname,'./public');

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(publicDirectoryPath));
var engine = require('ejs-locals');
app.engine('ejs',engine);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret:"mysecret",
    cookie:{
        maxAge:1000*60*2
    },
    saveUninitialized:false,
    resave:false
}));

app.use('/product',productRouter);
app.use('/user',userRouter);
app.use(pageRouter)
//app.use('/admin',AdminRouter);


// app.use(passport.initialize());
// app.use(passport.session());

// app.post("/",passport.authenticate('local',{
//     failureRedirect:'/',
//     successRedirect:'/private'
// }))

// passport.use(new passportLocal(
// {
//      usernameField: 'email',
//     passwordField: 'password'
// },
//     (username,password,done)=>{
//        User.findUser(username,password)
//        .then((user)=>{
//         console.log(user);
//         if(user){
           
//             return done(null,user);
//         }
//         else{
//             return done(null,false);
//         }
//        });
//     }
// ))

// passport.serializeUser((user,done)=>{
//     console.log('seri.....')
//     done(null,user._id);
// })
// passport.deserializeUser((id,done)=>{
//     console.log('deser......')
//     User.findById(id,(err,user)=>{
//         done(err,user);
//     })
// })

// app.get("/",(req,res)=>{
//     res.render('admin/login',{
//         title: 'Login'
//     })
// })

// app.get('/private',(req,res)=>{
//     if(req.isAuthenticated()){
//        return res.send(req.user);
//     }
//     res.redirect('/')
// })

const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`app listen ${port}`);
})