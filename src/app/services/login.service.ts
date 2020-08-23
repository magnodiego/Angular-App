import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private userSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient){
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser =  this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
}

  login(username: string, password: string): Observable<User> {

    return this.httpClient.post<any>(
      `${environment.apiUrl}/login`,
      {username, password}
    ).pipe( // permite hacer concatenaciones de operaciones sobre un observable
        map((user: User) => {
          this.updateUser(user);
          return user;
          }
        )
      );

    }

  updateUser(user: User){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
}


