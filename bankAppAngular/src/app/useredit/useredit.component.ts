import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  profileForm=this.fb.group({
    acno:["",[Validators.required]],
    balance:["",[Validators.required]],
    username:["",[Validators.required]],
  })

  constructor(private route:ActivatedRoute,private bankService:BankService,private fb:FormBuilder) {
    this.route.paramMap.subscribe((params:any)=>{
      console.log(params);
      // alert(params.params.id);
       const userId=params.params.id
      bankService.getUserProfile(userId)
      .subscribe((data:any)=>{
       this.profileForm.patchValue({
        username:data.username,
        acno:data.acno,
        balance:data.balance
         })
      })
    })
   }

  ngOnInit(): void {
  }
updateUserProfile(){
//     if(this.profileForm.valid==false){
//       alert("Invalid data")
//     }
//     else{
    
    //   const username=this.profileForm.value.username;
    //   const balance=this.profileForm.value.balance;
    //   const acno=this.profileForm.value.acno;
    //   this.route.paramMap.subscribe((params: any) => {
    //     const userId = params.params.id;
    //     this.bankService.updateUserProfile(username,balance,acno,userId)
    // .subscribe((data:any)=>{
//     //   alert(data.message)
//     })
//   })
//     }

  if (this.profileForm.valid == false) {
    alert("Invalid data")
  }
  else {

    const username = this.profileForm.value.name;
    const balance = this.profileForm.value.balance;
    const acno = this.profileForm.value.acno;
    
    this.route.paramMap.subscribe((params: any) => {
      const userId = params.params.id;
      this.bankService.updateUserProfile(username, balance, acno,  userId)
        .subscribe((data: any) => {
          alert(data.message)
        })
    })
  }
}
 }



