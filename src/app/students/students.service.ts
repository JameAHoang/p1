import { APISERVER } from './../enums/config.enum';
import { Student, response } from './students.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  constructor(private http: HttpClient,) {}
  // getStudents(): Observable<Student[]> {
  //   return this.http.get<Student[]>(APISERVER.API, this.httpOptions).pipe(
  //     map((data: Student[]) => {
  //       const transformedData = Object.keys(data).map((key) => data[key]);

  //       return transformedData;
  //     })
  //   );
  // }
  getStudents(): Observable<Student[]> {
    const endPoints = `/students.json`;
    return this.http
      .get<Student[]>(APISERVER.API + endPoints, this.httpOptions)
      .pipe(
        map((data) => {
          const posts: Student[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }
  GetStudentById(id: string): Observable<Student>{
    const endPoints = `/students/${id}.json`;
    return this.http
      .get<Student>(APISERVER.API + endPoints, this.httpOptions)

  }
  addStudent(data: Student): Observable<response> {
    const endPoints = `/students.json`;
    return this.http.post<response>(
      APISERVER.API + endPoints,
      data,
      this.httpOptions
    );
  }
  deleteStudent(id: string): Observable<response> {
    const endPoints = `/students/${id}.json`;
    return this.http.delete<response>(APISERVER.API + endPoints);
  }
  editStudent(id: string, data: Student): Observable<response>{
    const endPoints = `/students/${id}.json`;
    return this.http.put<response>(
      APISERVER.API + endPoints,
      data,
      this.httpOptions
    );
  }
}
