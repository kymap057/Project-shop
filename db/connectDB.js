const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const url = `${process.env.URL_DB}${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err) => {
        if (err) {
            return console.log('Error: ', err);
        }
        console.log('database connected....!!!');
});
