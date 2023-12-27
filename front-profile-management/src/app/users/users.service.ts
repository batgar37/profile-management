import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly usersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/create`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/update`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }
}
