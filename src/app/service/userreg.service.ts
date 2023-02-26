import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateList } from '../statelist';
import { UserRegistration } from '../user-registration';

@Injectable({
  providedIn: 'root'
})
export class UserregService {

  readonly userAPIURL = "https://localhost:7255/api";

  constructor(private http: HttpClient) { }

  addUser(data: any) {
    return this.http.post(this.userAPIURL + '/UserRegistration', data);
  }

  getStates(): Observable<StateList[]> {
    return this.http.get<StateList[]>(this.userAPIURL + '/States');
  }
}
