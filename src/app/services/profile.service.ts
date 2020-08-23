import { User } from './../model/user';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
  ) { }

  update(user: User): Observable<User>{


    this.loginService.currentUserValue.name = user.name;
    this.loginService.currentUserValue.surname = user.surname;
    this.loginService.currentUserValue.username = user.username;
    const userUpdate = this.loginService.currentUserValue;

    return this.httpClient.put<User>(
      `${environment.apiUrl}/profile`,
      userUpdate
    ).pipe(map(
      data => {
        this.loginService.updateUser(data);
        return data;
      }
    ));
  }
}

