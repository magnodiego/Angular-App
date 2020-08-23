import { map } from 'rxjs/operators';
import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  register(user: User): any {

    const theHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const userData = JSON.stringify(user);

    return this.httpClient.post<any>(
      `${environment.apiUrl}/register`,
      userData,
      {headers: theHeaders}
    ).pipe
      (map(( user: any) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      })
    );
  }
}
