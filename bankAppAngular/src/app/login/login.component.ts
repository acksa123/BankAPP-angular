import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  test="hello";
// username="";
// password="";

  loginForm=this.fb.group({
    username:["",[Validators.required]],
    password:["",[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    // Validators.minLength(5)
  })
constructor(private router:Router,private bankService:BankService,private fb:FormBuilder){//dependency injection

}
// onUsernameChange(event:any){
//  this.username= event.target.value;
// }
// onPasswordChange(event:any){
//   this.password= event.target.value;
//  }
 login(){
   if(this.loginForm.valid==false){
     //console.log(this.loginForm.controls.username.errors);//to check error in username
    //  if(this.loginForm.get('username')?.errors){
       alert("Invalid form");
     
   }
   else{
   const username=this.loginForm.value.username;
   const password=this.loginForm.value.password;
   
  this.bankService.authenticateUser(username ,password)
  .subscribe((data:any)=>{
  alert(data.message);
  //alert(data.token);
  localStorage.setItem("token",data.token);
  this.router.navigateByUrl("/home");
  },(err)=>{
    alert(err.error.message);
    
  })
  //  if(user==1){
  //   alert("login success")
  //   this.router.navigateByUrl("/home");
    
  //  }
  //  else if(user==0){
  //   alert("incorret password")
  //  }
  //  else if(user==-1){
  //   alert("no user exist with provided username")
  //  }
 }

}
}
