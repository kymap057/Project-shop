const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchemas= new mongoose.Schema({
    fistName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    phoneNumber:{
        type: String,
        unique:true,
        required: true
    },
    Gender:{
        type: Boolean
    },
    address:{
        detail:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            trim: true
        }
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password not null'],
        minlength: 8
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default: 'user'
    },
    listCart:[{
        type: mongoose.Schema.Types.ObjectId,
    }]
},{
    timestamps:true
});

UserSchemas.statics.findUser= async (email,password)=>{
    try {
        let user = await Users.findOne({email});
        if(!user){
            throw new Error('Email or password wrong...!');
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            throw new Error('password wrong ...!');
        }
        return user;
    } catch (e) {
        throw new Error('login fail...!')
    }
}

UserSchemas.pre('save',async function(next){
    try {
         if(!this.isModified('password')){
             return next();
         }
         let passwordHashed = await bcrypt.hash(this.password,12);
         this.password = passwordHashed;
         return next();
    } catch (error) {
        return next(error);
    }
});

const Users=mongoose.model('Users',UserSchemas);
module.exports = Users;

