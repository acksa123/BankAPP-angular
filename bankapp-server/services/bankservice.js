const app=require("../app");
const User=require('../models/user');
// let accountDetails={
  
//     userone:{acno:1000,balance:10000,username:"userone",password:"Testuser1@",history:[]},
//     usertwo:{acno:1001,balance:20000,username:"usertwo",password:"Testuser2@",history:[]},
//     userthree:{acno:1002,balance:25000,username:"userthree",password:"testuser2",history:[]},
//     userfour:{acno:1003,balance:45000,username:"userfour",password:"testuser3",history:[]}
  
  
//   };
  const authenticateUser=(username,password)=>{
   return User.findOne({
      username:username,
      password:password
     })
//        .then(data=>{
//          if(data){
//            res.send({
//              message:"Logged in"
             
//            });
//            }
//            else{
//              res.status(422).send({
//                message:"Invalid credentials"
//              });
//            }
         
//        })
//     let dataset=accountDetails;
   
//   if(username in dataset){
//       if(dataset[username].password==pwd){
//           return 1;//valid password
//       }
//     else{
//         //alert("incorret password")
//         return 0;
//     }
//   }
//   else{
//       return -1;//("no user exist with provided username")
//   }

 }
const deposit=(_id,amt)=>{
  //console.log(username)
  // let user=authenticateUser(username,pwd);
  return User.findById(_id)
  .then(user=>{
    //let dataset=accountDetails;
    // if(user==1){
      //dataset[username].balance+=amt; 
      user.balance+=amt; 
     // dataset[username].history.push({
      user.history.push({
        amount:amt,
        typeOfTransaction:'credit'
      });
      user.save();
       return {
         balance:user.balance,
        message:"ur accc credited with amount"+amt+ "aval balance="+user.balance
    }
  });
}
   
  //  else if(user==0){
  //   return{message:"incorret password"}
  //  }
  //  else if(user==-1){
  //   return {message:"no user exist with provided username"}
  //  }
  // }
  const withdraw=(_id,amt)=>{
   return User.findById(_id)
    .then(user=>{
      user.balance-=amt;
      user.history.push({
        amount:amt,
        typeOfTransaction:'debit'
      });
      user.save();
       return {
         balance:user.balance,
        message:"ur accc credited with amount"+amt+ "aval balance="+user.balance
    }
  });
}
    // let user=authenticateUser(username,pwd);
    // let dataset=accountDetails;
    // if(user==1){
    //   if(dataset[username].balance<amt){
    //     return {message:"Insufficient amount"};
    //   }
    //   else{
    //   dataset[username].balance-=amt;  
    //   dataset[username].history.push({
    //     amount:amt,typeOfTransaction:'debit'
    //   });    
    //    return {balance:accountDetails[username].balance,message:"ur accc debited with amount"+amt+"aval balance="+dataset[username].balance}
    //  }
    // }
  //    else if(user==0){
  //     return {message:"incorret password"}
  //    }
  //    else if(user==-1){
  //     return {message:"no user exist with provided username"}
  //    }
  
  // }
  const getUser=(_id)=>{
   // let user=authenticateUser(username,pwd);
   // if(user==1){
      // return accountDetails[username].history;
      return User.findById(_id);
  }
//   else{
//     return[]
//   }
// }
const updateUser=function(_id,data){
  return User.findOneAndUpdate({_id},data)
}
const getUsers=function(){
  return User.find();
}
const deleteUser=function(_id){
  return User.deleteOne({
    _id
  });
 
}
const update=function(_id,data){
  return User.findOneAndUpdate({_id},data)
}
module.exports={
    authenticateUser,
    deposit,
    withdraw,
    getUser,
    updateUser,
    getUsers,
    deleteUser,
    update
}