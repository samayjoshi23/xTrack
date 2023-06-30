import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseUrl = environment.supabase.url;
  private supabaseKey = environment.supabase.key;
  public supabase: SupabaseClient | any;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getUserForAuth(userId: string) {
    return await this.supabase.from('UserData').select('*').eq('userAuthId', userId);
  }


  async getUserByUserId(userId: string) {
    return await this.supabase.from('UserData').select('*').eq('userId', userId);
  }
  
  async addTransaction(userId: string){
    return await this.supabase.from('UserData').select('*').eq('userId', userId);
  }

  async getCategories(userId: string){
    return await this.supabase.from('Categories').select('*').eq('userId', userId);
  }
}
