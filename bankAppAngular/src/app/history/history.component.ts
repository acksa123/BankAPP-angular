import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
history :{amount:number,typeOfTransaction:string}[]= [
  // {amount:100,typeOfTransaction:'debit'},
  // {amount:150,typeOfTransaction:'credit'},
  // {amount:250,typeOfTransaction:'credit'},
];
  constructor(private bankService:BankService) {
   bankService.getHistory()
   .subscribe((data:any)=>{
     this.history=data;
   });
   }

  ngOnInit(): void {
  }

}
