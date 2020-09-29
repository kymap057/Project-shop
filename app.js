const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter');
//const AdminRouter = require('./router/adminRouter');
const { json } = require('body-parser');
require('dotenv').config();
require('./db/connectDB');

const publicDirectoryPath= path.join(__dirname,'./public');

//set định dang views
app.set('view engine','ejs');
//đường dẫn đến thư mục
app.set('views','./views');
//cấu hình public
app.use(express.static(publicDirectoryPath));
//vị trí đồng bộ template
var engine = require('ejs-locals');
app.engine('ejs',engine);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/product',productRouter);
app.use('/user',userRouter);
//app.use('/admin',AdminRouter);

app.get("/",(req,res)=>{
    res.render('admin/home',{
        title: 'Home'
    })
})




const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`app listen ${port}`);
})