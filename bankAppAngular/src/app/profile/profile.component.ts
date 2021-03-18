import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm=this.fb.group({
    acno:["",[Validators.required]],
    balance:["",[Validators.required]],
    username:["",[Validators.required]],
  })

  constructor(private fb:FormBuilder,private bankService:BankService ) { 
    bankService.getProfile()
    .subscribe((data:any)=>{
      this.profileForm.patchValue({
        acno:data.acno,
        balance:data.balance,
        username:data.username
      })
    })
    
  }
  
  ngOnInit(): void {
  }
  updateProfile(){
    if(this.profileForm.valid==false){
      alert("Invalid data")
    }
    else{
    this.bankService.updateProfile(
      this.profileForm.value.username,
      this.profileForm.value.balance,
      this.profileForm.value.acno,
    ).subscribe((data:any)=>{
      alert(data.message)
    })
    }
}

}
