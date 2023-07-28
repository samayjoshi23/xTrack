import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseUrl = environment.supabase.url;
  private supabaseKey = environment.supabase.key;
  public supabase: SupabaseClient | any;
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Signup
  async signUp(user: any) {
    let userCredentials = { email: user.email, password: user.password };

    //Saving new record for authentication
    const result = await this.supabase?.auth.signUp(userCredentials);
    if (result?.data != null) {
      let currentUser = [
        {
          appId: `@${user.name.slice(0, 4)}${Math.floor(Math.random() * 10000)}`,
          name: user.name,
          email: user.email,
          userAuthId: result?.data.user.id,
        },
      ];

      const { data, error } = await this.supabase.from('UserData').insert(currentUser);
      if(!data)
        console.log(error);
    }
    else
      console.log(result?.error.Message);

    return result;
  }

  // Login
  login(email: string, password: string){
    return this.http.post<Observable<any>>('api/user/login', { email, password });
  }

  // Logout
  logout(){
    return this.http.post<Observable<any>>('api/user/signout', {});
    // return this.supabase.auth.signOut();
  }

  setAuthToken(token : string){
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    let token = this.authToken ? this.authToken : localStorage.getItem('authToken');
    return token;
  }

  removeToken(){
    this.authToken = null;
    localStorage.removeItem('authToken');
  }

  isUserLoggedIn(){
    return !!this.getAuthToken();
  }
}
