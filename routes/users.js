var express = require('express');
const { response } = require('../app');
const abc = require('../models/abc');
const user = require('../models/user');
var router = express.Router();
const User=require('../models/user')
const jwt = require('jsonwebtoken')
const { protect } = require('../MiddleWares/AuthMiddleWare')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/submit',(req,res)=>{
  // let obj={name:'shweta',surname:'kamble',salary:123344}
  console.log(req.body)
  /*let obj=user({userid:req.body.User.userid,
    name:req.body.User.name,
    surname:req.body.User.surname,
    email:req.body.User.email,
    password:req.body.User.password,
    mobile:req.body.User.mobile,
    projects:req.body.User.projects,
    friends:req.body.User.friends,
    skillsets:req.body.User.skillsets,
    experience:req.body.User.experience,
    description:req.body.User.description,
  })*/

  const user = req.body.User
  //let email = obj.email
  /*const user= User.findOne({email})
     console.log(user)
    if(user){
      res.send("User Already Exist...")
     // throw new Error("User Already Exist...")
    }
    else
    {
      const u1 =new User(obj)
      console.log(u1)
      u1.save((err,user) => {
        if (!err)
            console.log('success'+ 'User added successfully!');
        else
            console.log('Error during record insertion : ' + err);
      });
    }*/
   /* User.findOne({email:req.body.User.email}).lean().exec((err,user)=>{
      if(err)
      console.log(err)
      if(user)
      console.log("User Already Exist...")
      else
      {
        user.save((err,data)=>{
          if(err)
          console.log(err)
          else
          console.log(data)
        })
      }
    })*/
    console.log(user.email)
    
  console.log(user.userid)
    User.findOne({email:user.email})
    .then((userinfo)=>{
      if(userinfo != null) 
      {
      console.log("user already exists.");
      res.status(200).send("User Already Exist..")
      }
       else 
       {
         const u1=new User(user)
         console.error("no user found in db");
       // res.status(401).send("user not found in db");
        u1.save((err,data)=>{
          if(err)
          console.log(err)
          else{
            console.log(data)
            res.status(201).json({
              ...data,
              token: generateToken(u1)
            })

          }
        })

      }
    })
  
})

const generateToken = (user)=>{
  const secretKey = "abc123"
  return jwt.sign({user},secretKey,{expiresIn:"30d"})
}

router.post('/login',(req,res)=>{
  console.log(req.body.User)
  var user=req.body.User
  /*User.findOne({$and:[{email:req.body.User.email},{password:req.body.User.password}]},function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Result : ", docs);
        if(docs)//!=null)
       
        console.log("Login Successfull.....")
        else
       // console.log("Login Unsuccessfull")
        console.log("Login Failed.....")
    }
});*/

   console.log(user)
   User.findOne({$and:[{email:user.email},{password:user.password}]})
   .then((docs)=>{
    console.log("Result : ", docs);
    if(docs)//!=null)
   {
      console.log("Login Successfull.....")
      res.send({
        ...docs,
        token: generateToken(docs)
      })
   }
   }).catch((error)=>{
    console.log(error)
    res.status(401).send("Login Failed...")
   })


})

router.get('/fetchdata',protect,(req,res)=>{
  User.find((err,data)=>{
   if(err) throw err
   res.send(data)
  })
 })


 router.put('/update/:id',(req,res)=>{
  User.findById(req.params.id,(err,data)=>{
      if(err) throw err
      data.name=req.body.name,
      data.surname=req.body.surname,
      data.salary=req.body.salary
      data.save((err)=>{
          if(err) res.send('not updated')
          else
          res.send("data updated")
      })

  })
})
 router.get('/user/:id',(req,res)=>{
        User.findById(req.params.id,(err,data)=>{
            if(err) res.send("id not found")
            
           else res.send(data)
    
        })
    })
   /* const query = User.find().where("_id").equals(req.params.id)
    router.put('/user/:id',(req,res)=>{
    query.exec(req,res)=>({
          if(err) res.send("id not found")
          else res.send(data)
          })
  
      })*/
  
    router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id,(err)=>{
        if(err) res.send('not deleted')
        else
        res.send("deleted")
    })


   /* router.get('/login',(req,res)=>{
     console.log(req.body)
      User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err) res.send("Incorrect Username or Password")
        if(user)
        {
          console.log("req.body.User")
          if(user.password==req.body.User.password)
          res.send("Login Successfully"+user)
          else
          res.send("Incorrect Username or Password")
        }
     })
    })*/

   /* router.post('/signIn',(req,res)=>{
      console.log(req.body.email)
      User.findOne({email: req.body.email},
         function(err,user) {
        if (err)
          return done(err);
       
        if (!user) {
          console.log('That account does not exist!')
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
if (user.password != password) {
          console.log('Wrong password!')
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        return done(null, user);
      });
    });*/
    /*function(req, email, password, done) {
      User.findOne({
          email: req.body.email
        }, function(err,
          user) {
          if (err)
            return done(err);
         
          if (!user) {
            console.log('That account does not exist!')
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          }
  if (user.password != password) {
            console.log('Wrong password!')
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          }
          return done(null, user);
        });
      }));*/

    })


module.exports = router;

