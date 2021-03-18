import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  accountDetails:any={
  
    userone:{acno:1000,balance:10000,username:"userone",password:"Testuser1@",history:[]},
    usertwo:{acno:1001,balance:20000,username:"usertwo",password:"testuser1",history:[]},
    userthree:{acno:1002,balance:25000,username:"userthree",password:"testuser2",history:[]},
    userfour:{acno:1003,balance:45000,username:"userfour",password:"testuser3",history:[]}
  
  
  };

  authenticateUser=(username:string,pwd:string)=>{
    let dataset=this.accountDetails;
   
  if(username in dataset){
      if(dataset[username].password==pwd){
          return 1;//valid password
      }
    else{
        //alert("incorret password")
        return 0;
    }
  }
  else{
      return -1;//("no user exist with provided username")
  }

}
deposit=(username:string,pwd:string,amt:number)=>{
  let user=this.authenticateUser(username,pwd);
  let dataset=this.accountDetails;
  if(user==1){
    dataset[username].balance+=amt;  
    dataset[username].history.push({
      amount:amt,typeOfTransaction:'credit'
    });
     alert("ur accc credited with amount"+amt+"aval balance="+dataset[username].balance)
   }
   else if(user==0){
    alert("incorret password")
   }
   else if(user==-1){
    alert("no user exist with provided username")
   }
  }

  withdraw=(username:string,pwd:string,amt:number)=>{
    let user=this.authenticateUser(username,pwd);
    let dataset=this.accountDetails;
    if(user==1){
      if(dataset[username].balance<amt){
        alert("Insufficient amount");
      }
      else{
      dataset[username].balance-=amt;  
      dataset[username].history.push({
        amount:amt,typeOfTransaction:'debit'
      });    
       alert("ur accc debited with amount"+amt+"aval balance="+dataset[username].balance)
     }
    }
     else if(user==0){
      alert("incorret password")
     }
     else if(user==-1){
      alert("no user exist with provided username")
     }
  
  }
  getHistory(){
    let dataset=this.accountDetails;
    return dataset["userone"].history;
  }


}
