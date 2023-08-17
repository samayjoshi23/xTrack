import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../SharedService/shared.service';
import { OperationResult } from 'src/Models/OperationResult';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private sharedService : SharedService
  ) { }

  getHomeData(){
    return this.http.get('api/transaction/homeData');
  }


  getUserForAuth():Observable<any> {
    return this.http.get<Observable<any>>('api/user/getuser');
  }
  
  
  getUserData():Observable<any> {
    return this.http.get<Observable<OperationResult>>('api/user/getuser');
  }
  
  // async addTransaction(userId: string){
  //   return await this.supabase.from('Users').select('*').eq('userId', userId);
  // }

  // async getCategories(userId: string){
  //   return await this.supabase.from('Categories').select('*').eq('userId', userId);
  // }
}

