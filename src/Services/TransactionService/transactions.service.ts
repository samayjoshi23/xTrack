import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../SharedService/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  // Get Transactions for dashboard
  GetDashboardTransactions(range: string):Observable<any>{
    let httpParam = this.shared.getHttpParams({ range: range });
    return this.http.get<Observable<any>>('api/transaction/getTransactions', { params: httpParam });
  }

  // Get Transactions for dashboard
  GetCategories():Observable<any>{
    return this.http.get<Observable<any>>('api/transaction/getCategories');
  }

}
