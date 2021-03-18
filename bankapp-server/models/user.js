const mongoose=require('mongoose');
const User=mongoose.model('User',{
    acno:Number,
    balance:Number,
    username:String,
    password:String,
    history:[
        {
            typeOfTransaction:String,
            amount:Number
        }
    ]
});
module.exports=User;