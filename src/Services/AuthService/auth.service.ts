import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseUrl = environment.supabase.url;
  private supabaseKey = environment.supabase.key;
  public supabase: SupabaseClient | any;

  constructor() {
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

      // saving new record for user
      const { data, error } = await this.supabase.from('UserData').insert(currentUser);
      if(data)
        console.log(data);
      else
        console.log(error);
    }
    else
      console.log(result?.error.Message);

    return result;
  }

  // Login
  async login(email: string, password: string) {
    return await this.supabase?.auth.signInWithPassword({ email, password });
  }
}
