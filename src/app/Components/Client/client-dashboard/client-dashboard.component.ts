import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableToQueryStringParams } from 'src/Models/TableQueryParams';
import { TransactionsService } from 'src/Services/TransactionService/transactions.service';
import { UserService } from 'src/Services/UserData/user.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {


  public loggedInUserId : string  | null = '';
  public transactionList : any[] = [];
  public categoryList : any[] = [];
  public UserDetals : any = {
    name: '',
    email: '',
    appId: '',
    userId: ''
  }
  public tableObj:TableToQueryStringParams = {
    table: "Users",
    alias: "",
    getAll: true,
    joinWithTable: [],
    columns: [],
    range: null,
    filters: {}
  };


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private user: UserService,
    private transactions: TransactionsService
  ) { }


  ngOnInit(): void {
    this.actRoute.parent?.paramMap.subscribe(params => {
      this.loggedInUserId = params.get('id');
    });
    if(this.loggedInUserId){
      this.getUserData();
      this.getTransactions();
      this.getCategories();
    }
  }

  
  getUserData(){
    this.user.getUserData().subscribe({
      next: (result : any) => {
        this.UserDetals = result.data[0];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTransactions(){
    this.transactions.GetDashboardTransactions("0-6").subscribe({
      next: (result : any) => {
        console.log(result);
        this.transactionList = result.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategories(){
    this.transactions.GetCategories().subscribe({
      next: (result : any) => {
        console.log(result);
        this.categoryList = result.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTransactionIconClass(icon :string, type: string):string{
    return type == "Expense" ? `${icon} text-danger` : `${icon} text-success`;
  }
}
