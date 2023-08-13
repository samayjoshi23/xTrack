import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { RequestParms, TableToQueryStringParams } from 'src/Models/TableQueryParams';
import { environment } from 'src/environments/environment';
import { SharedService } from '../SharedService/shared.service';
import { OperationResult } from 'src/Models/OperationResult';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseUrl = environment.supabase.url;
  private supabaseKey = environment.supabase.key;
  public supabase: SupabaseClient | any;

  constructor(private http: HttpClient, private sharedService : SharedService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }
  getHttpParams(params : any){
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    return httpParams;
  }


  getHomeData(){
    return this.http.get('api/transaction/homeData');
  }


  getUserForAuth():Observable<any> {
    return this.http.get<Observable<any>>('api/user/getuser');
  }
  
  
  getUserData(tableObject : TableToQueryStringParams):Observable<any> {
    let param : RequestParms = this.sharedService.getQueryString(tableObject);
    const httpParams = this.getHttpParams(param);
    console.log(HttpParams);
    return this.http.get<Observable<OperationResult>>('api/user/getuser', { params : httpParams });
  }
  
  async addTransaction(userId: string){
    return await this.supabase.from('Users').select('*').eq('userId', userId);
  }

  async getCategories(userId: string){
    return await this.supabase.from('Categories').select('*').eq('userId', userId);
  }
}

