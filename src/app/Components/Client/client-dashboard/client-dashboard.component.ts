import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationResult } from 'src/Models/OperationResult';
import { TableToQueryStringParams } from 'src/Models/TableQueryParams';
import { ExpenseCatergoryListModel } from 'src/Models/Transaction/ExpenseCatergoryListModel.model';
import { TransactionListModel } from 'src/Models/Transaction/TransactionModel.model';
import { YearlyTransactionList } from 'src/Models/Transaction/YearlyTransactionList.model';
import { ExpenseTypes } from 'src/Models/Transaction/expenseTypes.model';
import { UserModel } from 'src/Models/User/UserModel.model';
import { SharedService } from 'src/Services/SharedService/shared.service';
import { TransactionsService } from 'src/Services/TransactionService/transactions.service';
import { UserService } from 'src/Services/UserData/user.service';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  loggedInUserId : string | null = '';
  currentMonth: number = new Date().getMonth()+1;
  expenseTypesEnum = ExpenseTypes;
  incomeTotal: number = 0;
  expenseTotal: number = 0;
  transactions : TransactionListModel[] = [];
  categoryList : ExpenseCatergoryListModel[] = [];
  transactionsThisYear : YearlyTransactionList[] = [];
  monthList : string[] = [];
  incomeDataList : number[] = [];
  expenseDataList : number[] = [];

  UserData : UserModel = {
    id: "",
    appId: "",
    name: "",
    email: "",
    created_at: Date.now(),
    isActive: true,
  };

  tableObj:TableToQueryStringParams = {
    table: "Users",
    alias: "",
    getAll: true,
    joinWithTable: [],
    columns: [],
    range: null,
    filters: {}
  };

  public lineChartType: ChartType = 'line';
  private newLabel? = 'New label';
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Expense',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'green',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        // fill: 'origin',
      },
      {
        data: [],
        label: 'Income',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        // fill: 'origin',
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      // y1: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red',
      //   },
      // },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'August',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'This Month',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private sharedService: SharedService,
    private actRoute: ActivatedRoute,
    private user: UserService,
    private transactionsService: TransactionsService
  ) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.actRoute.parent?.paramMap.subscribe(params => {
      this.loggedInUserId = params.get('id');
    });
    this.presetYearlyList();
    this.monthList = this.sharedService.getMonthList();
    if(this.loggedInUserId){
      this.getUserData();
      this.getTransactions();
      this.getCategories();
    }
  }
  
  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
        ClientDashboardComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  // public chartClicked({
  //   event,
  //   active,
  // }: {
  //   event?: ChartEvent;
  //   active?: object[];
  // }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({
  //   event,
  //   active,
  // }: {
  //   event?: ChartEvent;
  //   active?: object[];
  // }): void {
  //   console.log(event, active);
  // }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }



  getUserData(){
    this.user.getUserData().subscribe({
      next: (result : OperationResult) => {
        this.UserData = result.data[0];
        this.sharedService.setUserAppId(this.UserData.appId);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTransactions(){
    let monthFilter = this.getCurrentYearFilter();
    console.log(monthFilter);
    this.transactionsService.GetDashboardTransactions(monthFilter).subscribe({
      next: (result : OperationResult) => {
        console.log(result.data);
        this.transactions = result.data;
        this.monthSpendTotalForBoard();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getCategories(){
    this.transactionsService.GetCategories().subscribe({
      next: (result : OperationResult) => {
        this.categoryList = result.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTransactionIconClass(icon :string, type: string):string{
    return type == ExpenseTypes.Expense ? `${icon} text-danger` : `${icon} text-success`;
  }

  monthSpendTotalForBoard(){
    this.transactions.forEach((transaction : TransactionListModel) => {
      let date = new Date(transaction.dateCreated);
      this.transactionsThisYear[date.getMonth()].transactions.push(transaction);
      if(transaction.transactionType == ExpenseTypes.Expense){
        this.transactionsThisYear[date.getMonth()].expense += transaction.amount;
      }
      else{
        this.transactionsThisYear[date.getMonth()].income += transaction.amount;
      }
    });

    this.expenseTotal = this.transactionsThisYear[this.currentMonth].income;
    this.incomeTotal = this.transactionsThisYear[this.currentMonth].expense;
    this.createIncomeAndExpenseList();
  }

  presetYearlyList(){
    for(let i = 0; i< 12 ; i++){
      let monhlyData : YearlyTransactionList = {
        monthNumber : i+1,
        expense : 0,
        income : 0,
        transactions  : []
      };
      this.transactionsThisYear.push(monhlyData);
    }
    console.log(this.transactionsThisYear);
  }
  
  getCurrentYearFilter(){
    const d = new Date();
    let year = d.getFullYear();
    let filter = `&dateCreated=gte.${year}-01-01`;
    filter += `&dateCreated=lte.${year}-12-31`;

    return filter;
  }

  createIncomeAndExpenseList(){
    this.transactionsThisYear.forEach((month: YearlyTransactionList) => {
      this.expenseDataList.push(month.expense);
      this.incomeDataList.push(month.income);
    });
    this.createChart();
  }
  
  createChart(){
    this.lineChartData.datasets[0].data = this.expenseDataList;
    this.lineChartData.datasets[1].data = this.incomeDataList;
    this.lineChartData.labels = this.monthList;
    this.chart?.update();
  }


}
