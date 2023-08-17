import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  // Signup
  signUp(user: any):Observable<any>{
    return this.http.post<Observable<any>>('api/user/signup', user);
  }

  // Login
  login(email: string, password: string){
    return this.http.post<Observable<any>>('api/user/login', { email, password });
  }

  // Logout
  logout(){
    return this.http.post<Observable<any>>('api/user/signout', {});
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
