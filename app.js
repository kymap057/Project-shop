const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
const pageRouter = require('./client/router/pageAdminRouter');
const AdminRouter = require('./router/adminRouter');
require('dotenv').config();
//require('./db/connectDB');
require('./db/connectMySqlDB');
const publicDirectoryPath= path.join(__dirname,'./public');

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(publicDirectoryPath));
var engine = require('ejs-locals');
app.engine('ejs',engine);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());


app.use(session({
    secret:"projectabcshop",
    cookie:{
        maxAge:1000*60*60
    },
    saveUninitialized:false,
    resave:false
}));

app.use('/product',productRouter);
app.use('/user',userRouter);
app.use(pageRouter)
app.use('/admin',AdminRouter);



const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`app listen ${port}`);
})