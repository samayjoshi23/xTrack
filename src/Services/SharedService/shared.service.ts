import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestParms } from 'src/Models/TableQueryParams';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();


  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  toggleSidebarVisibility(value: boolean) {
    this.sidebarVisibleSubject.next(value);
  }

  getIsUserLoggedIn(){
    
  }
  
  getQueryString(requestObj : any) {
    let mainQuery  = "";
    let subQuery = "";
    let mainFilter = "";
    let subFilter = "";
    let requestParams: RequestParms = {
      queryString: "",
      range: null
    }
    
    mainQuery += requestObj.table + '?select=';
    if(requestObj.getAll){
      mainQuery += '*';
    }
    else{
      mainQuery += `(${requestObj.columns.join(',')})`;
    }
    for(let filter in requestObj.filters){
      mainFilter += `&${(requestObj.alias && requestObj.alias.length>0) ? `${requestObj.alias}.` : ''}${filter}=${requestObj.filters[filter]}`;
    }
    if(requestObj.joinWithTable.length > 0){
        requestObj.joinWithTable.forEach((table : any) => {
            subQuery += `,${(table.alias && table.alias.length>0)? `${table.alias}:` : ''}${table.tableName}`;
            subQuery += `(${table.columns.length > 0 ? table.columns.join(',') : '*'})`;
            for(let filter in table.filters){
              subFilter+= `&${(table.alias && table.alias.length>0)? `${table.alias}.` : ''}${filter}=${table.filters[filter]}`;
            }
        });
    }
    
    requestParams.queryString = (mainQuery+subQuery+subFilter+mainFilter);
    requestParams.range = requestObj.range != null ? requestObj.range : null;
    return requestParams;
  }
}
