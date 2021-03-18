import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// username="";
// password="";
// amount="";
homeForm=this.fb.group({
  username:[""],
  password:[""],
  amount:[]
})
constructor(private bankService:BankService ,private router:Router,private fb:FormBuilder){
  
}
ngOnInit():void{

}

 
  

// onUsernameChange(event:any){
//  this.username=event.target.value;
// }

// onPasswordChange(event:any){
//   this.password=event.target.value;
//  }

//  onAmountChange(event:any){
//   this.amount=event.target.value;
//  }

deposit(){
  // const username=this.homeForm.value.username;
  // const password=this.homeForm.value.password;
  const amount=parseInt(this.homeForm.value.amount);
this.bankService.deposit(amount)
.subscribe((data:any)=>{
  alert(data.message);
})
//this.router.navigateByUrl("/history");
}

withdraw(){
  const username=this.homeForm.value.username;
  const password=this.homeForm.value.password;
  const amount=parseInt(this.homeForm.value.amount);
  this.bankService.withdraw(amount)
  .subscribe((data:any)=>{
    alert(data.message);
  })

}

 
logout(){
  localStorage.removeItem("token");
  this.router.navigateByUrl("/");
}

}
