import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:{acno:Number,balance:Number,username:String}[]=[];
  constructor(private  bankService:BankService,private router:Router) { 
    bankService.getUsers()
    .subscribe((data:any)=>{
      this.users=data;
    })
  }

  ngOnInit(): void {
  }
edit(item:any){
this.router.navigate(["users",item._id])
}
}
