import { APISERVER } from './../enums/config.enum';
import { res, Teacher } from './teacher.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  constructor(private http: HttpClient) {}

  getTeacher(): Observable<Teacher[]> {
    const endPoints = `/teacher.json`;
    return this.http
      .get<Teacher[]>(APISERVER.API + endPoints, this.httpOptions)
      .pipe(
        map((data) => {
          const teacher: Teacher[] = [];
          for (let key in data) {
            teacher.push({ ...data[key], id: key });
          }
          return teacher;
        })
      );
  }
  addTeacher(data: Teacher): Observable<res> {
    const endPoints = `/teacher.json`;
    return this.http.post<res>(
      APISERVER.API + endPoints,
      data,
      this.httpOptions
    );
  }
  getTeacherById(id: string): Observable<res> {
    const endPoints = `/teacher/${id}.json`;
    return this.http.get<res>(APISERVER.API + endPoints, this.httpOptions);
  }
  deleteTeacherById(id: string): Observable<res> {
    const endPoints = `/teacher/${id}.json`;
    return this.http.delete<res>(APISERVER.API + endPoints);
  }
  editTeacher(id: string, data: Teacher): Observable<res> {
    const endPoints = `/teacher/${id}.json`;
    return this.http.put<res>(
      APISERVER.API + endPoints,
      data,
      this.httpOptions
    );
  }
}
