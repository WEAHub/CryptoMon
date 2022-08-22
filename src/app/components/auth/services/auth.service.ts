import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserLogin, User } from '../models/user.model';
@Injectable()

export class AuthService {
  constructor(private http: HttpClient) { }

  login(userData: UserLogin): Observable<any> {
    return this.http.post('http://localhost/login', userData);
  }
  
}