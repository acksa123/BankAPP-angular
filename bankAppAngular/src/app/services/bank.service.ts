import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {environment} from '../../environments/environment';
const apiUrl=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BankService {
constructor(private http:HttpClient){

}
  // accountDetails:any={
  
  //   userone:{acno:1000,balance:10000,username:"userone",password:"Testuser1@",history:[]},
  //   usertwo:{acno:1001,balance:20000,username:"usertwo",password:"testuser1",history:[]},
  //   userthree:{acno:1002,balance:25000,username:"userthree",password:"testuser2",history:[]},
  //   userfour:{acno:1003,balance:45000,username:"userfour",password:"testuser3",history:[]}
  
  
  // };

  authenticateUser=(username:string,pwd:string)=>{
    // console.log(username,pwd);
    
    return this.http.post(apiUrl+"/login",{
      "username":username,
      "password":pwd
  
})
  }
  generateHeader=()=>{
    let token= localStorage.getItem("token");
    let headers=new HttpHeaders();
    headers=headers.set("authorization","Bearer "+token)
    return headers;
  }
  
//     let dataset=this.accountDetails;
   
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

// }
deposit=(amt:number)=>{
  
  
  return this.http.post(apiUrl+"/deposit",{
      
      "amount":amt
},{
      headers:this.generateHeader()
});

}
  // let user=this.authenticateUser(username,pwd);
  // let dataset=this.accountDetails;
  // if(user==1){
  //   dataset[username].balance+=amt;  
  //   dataset[username].history.push({
  //     amount:amt,typeOfTransaction:'credit'
  //   });
  //    alert("ur accc credited with amount"+amt+"aval balance="+dataset[username].balance)
  //  }
  //  else if(user==0){
  //   alert("incorret password")
  //  }
  //  else if(user==-1){
  //   alert("no user exist with provided username")
  //  }
  // }

  withdraw=(amt:number)=>{
    // let headers=new HttpHeaders();
    // headers=headers.set("authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJvbmUiLCJpYXQiOjE2MTMwMzAxOTZ9.HO1eiNyb4efGctwuK3VI7hROTz5oL2PZnI4DWHKqkoE")
 
  
  return this.http.post(apiUrl+"/withdraw",{
      
      "amount":amt
    },{
      headers:this.generateHeader()
});

  }
  //   let user=this.authenticateUser(username,pwd);
  //   let dataset=this.accountDetails;
  //   if(user==1){
  //     if(dataset[username].balance<amt){
  //       alert("Insufficient amount");
  //     }
  //     else{
  //     dataset[username].balance-=amt;  
  //     dataset[username].history.push({
  //       amount:amt,typeOfTransaction:'debit'
  //     });    
  //      alert("ur accc debited with amount"+amt+"aval balance="+dataset[username].balance)
  //    }
  //   }
  //    else if(user==0){
  //     alert("incorret password")
  //    }
  //    else if(user==-1){
  //     alert("no user exist with provided username")
  //    }
  
  // }
  getHistory(){
    return this.http.get(apiUrl+"/history",{
      headers:this.generateHeader()
    // let dataset=this.accountDetails;
    // return dataset["userone"].history;
  });
}
  getProfile(){
    return this.http.get(apiUrl+"/profile",{
      headers:this.generateHeader()
    
  });

}
getUsers(){
  return this.http.get(apiUrl+"/users",{
    headers:this.generateHeader()
  });
}
getUserProfile=(userId:any)=>{
  return this.http.get(apiUrl+"/users/"+userId,{
    headers:this.generateHeader()
  })
}
updateProfile(username:string,balance:Number,acno:Number){//1.url 2.data 3.header
  return this.http.patch(apiUrl+"/profile",{
username,
balance,
acno
},{
  headers:this.generateHeader()

});

}
updateUserProfile=(username:string,balance:Number,acno:Number,userId:any)=>{//1.url 2.data 3.header
  return this.http.patch(apiUrl+"/users/"+userId,{
    username,
    balance,
    acno,
    userId
  },{
  headers:this.generateHeader()

});

}
}
