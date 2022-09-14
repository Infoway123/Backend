const mongoose=require('mongoose')
const Project=new mongoose.Schema({
 
        name:{
            type:String,
            required:[true,"Please enter your name"],
        },

        creatorid:{
            type:String,
            required:[true],
            minLength:[6],
            maxLength:[6],
        },

        description:{
            type:String,
            required:[true],
            minLength:[5,"Description is neccesary"],
            maxLength:[150,"Should not exceed 150 characters"],
        },

        requirements:{
            type:String,
            required:[true],
        },

        payment:{
            type:String,
            required:[true],
            select:false,
        },

        status:{
            type:String,
            required:[true,"Please enter valid status"],
        },
        
        leaderid:{
            type:String,
            required:[true,"Please enter leaderid"],
            minLength:[6],
            maxLength:[6],
        },

        teamusers:{
            type:String,
        },
   
    
})


module.exports=mongoose.model('Project',Project)