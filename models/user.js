const mongoose=require('mongoose')
const User=new mongoose.Schema({
 
    userid:
    {
        type:String,
        unique:true,
        null:false,
        minLength:[36],
        maxLength:[36],
        required:true,
    },

        name:
        {
        type:String,
        required:[true,"Please enter your name"],
    },
        
        
        surname:
        {
            type:String,
            required:[true,"Please enter your name"],
        },

        email:
        {
            type:String,
            required:[true,"Please enter your name"],
            unique:true,

        },

        password:
        {
        type:String,
        required:[true,"Please enter your name"],
        minLength:[8,"Password must be greater than 8 characters"],
       // maxLength:[36,"Password should not be greater than 36 characters"],
        select:false,
    },

        mobile:
        {
            type:Number,
            required:[true,"Please enter your name"],
            minLength:[10,"Mobile number not valid"],
            maxLength:[10,"Mobile number not valid"],
        },

        projects:
        {
            type:String,
            required:[true,"Please enter your name"],
        },

        friends:
        {
            type:String,
            required:[true,"Please enter your name"],
        },

        skillsets:
        {
            type:String,
            required:[true,"Please enter your name"],
        },

        experience:
        {
            type:Number,
            required:[true,"Please enter your name"],
            default:0
        },

        description:
        {
            type:String,
            required:[true,"Please enter your name"],
        },

        admin:
        {
            type:Boolean,
            required:true,
            default:false
        },

   
})
module.exports=mongoose.model('User',User)