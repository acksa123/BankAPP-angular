var express = require('express');
var router = express.Router();
var bankService=require('../services/bankservice')
const jwt=require('jsonwebtoken');
const User = require('../models/user');

const jwtSecret="secretkey!@#";
const authMiddleware=(req,res,next)=>{
  try{
    console.log(req.headers.authorization);
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,jwtSecret);
    req.user=user;
    next();
  }
  catch{
    res.status(401).send({
      message:"Invalid token"
    });
  }
}
/* GET home page. */
router.get('/', function(req, res) {
  // searching for a user with username starts with user--> ^       ends with  /one$/   $
  User.find({
    username:{
$regex:/^usero/
    }
    // $or:[
    // balance:{
    //   $gte:10000
    // },
    // {

    // }]
  })
  .then(users=>{
    res.send(users)
  })
 
  //  const user=new User({
  //   acno:123,
  //   balance:12345,
  //   username:"test",
  //   password:"test3",
  //   history:[]
  //  })
  //  user.save();

  // console.log(req.query.username);
  
});
router.get('/users',authMiddleware, function(req,res){
  bankService.getUsers()
  .then(users=>{
    res.send(users);
  })
})
router.post('/login', function(req, res) {
  
  // console.log(req.body.username,req.body.password);
  bankService.authenticateUser(req.body.username,req.body.password)
  .then(user=>{
    if(user){
      // token creation....store username..secret key..
        const token=jwt.sign({
          exp:Math.floor(Date.now()/1000)+(60*60*5),//epoch time
          username:req.body.username,
          _id:user._id
      },jwtSecret);
      // const decoded=jwt.verify(token,"secretkey!@#")
    res.send({
      message:"Logged in",
      token:token
    });
    }else{
      res.status(422).send({
        message:"Invalid credentials"
      });
    }
  });
  // console.log(result);
 
  // res.render('index', { title: 'Express' });
});
router.post('/deposit',  authMiddleware,function(req, res) {
  
  
  
  bankService.deposit(req.user._id,req.body.amount)
  .then(message=>{
    res.send(message)
  })

  
  
  // console.log(result);
  
  
  
  // res.render('index', { title: 'Express' });
});
router.post('/withdraw', authMiddleware, function(req, res) {


  
 bankService.withdraw(req.user._id,req.body.amount)
  .then(message=>{
    res.send(message)
  })
});
router.get('/history', authMiddleware, function(req, res) {
 
 bankService.getUser(req.user._id)
 .then(user=>{
  res.send(user.history);
 });
});
 router.get('/profile', authMiddleware, function(req, res) {
 
  bankService.getUser(req.user._id)
  .then(user=>{
   res.send(user);
  });
})
router.patch("/profile",authMiddleware,function(req,res){
  bankService.updateUser(req.user._id,req.body)
  .then(user=>{
   res.send({
     message:"Profile updated successfully"
   });
  });
})
router.patch("/test/:id",function(req,res){
  res.send(req.params.id);
})

router.delete("/users/:id",function(req,res){
  
  bankService.deleteUser(req.params.id)
  .then(user=>{
   res.send({
     message:" User deleted successfully"
   });
  });
})
router.patch("/update/:id",function(req,res){
  bankService.update(req.params.id,req.body)
  .then(user=>{
   res.send({
     message:"Profile updated successfully"
   });
  });
})
module.exports = router;
