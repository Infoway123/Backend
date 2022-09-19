const mongoose=require('mongoose')
const Project=new mongoose.Schema({
        
        projectid:{
        type:String,
        required:[true],
        minLength:[36],
        maxLength:[36],
    },
        name:{
            type:String,
            required:[true,"Please enter your name"],
        },

        creatorid:{
            type:String,
            required:[true],
            minLength:[36],
            maxLength:[36],
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

        projectDoc:{
            type:String,
           
        },

        technologies:{
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
            minLength:[36],
            maxLength:[36],
        },

        teamusers:{
            type:String,
        },
   
    
})


module.exports=mongoose.model('Project',Project)