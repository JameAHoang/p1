import { LoginComponent } from './../login/login.component';
import { map } from 'rxjs/operators';
import { data } from 'jquery';
import { TeacherService } from './../teacher/teacher.service';
import { StudentsService } from './../students/students.service';
import { Teacher } from './../teacher/teacher.model';
import { Student } from './../students/students.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, pipe } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userAuth: AuthService,
    private router: Router,
    private students: StudentsService,
    private teacher: TeacherService
  ) {}
  ListStudents: Student[] = [];
  ListTeacher: Teacher[] = [];
  filterStudent: any[];
  ngOnInit(): void {
    //this.loadData();
    this.loadDataEx1();
  }
  loadData() {
    forkJoin([
      this.students.getStudents(),
      this.teacher.getTeacher(),
    ]).subscribe(([requestOne, requestTwo]) => {
      (this.ListStudents = requestOne), console.log(requestOne);
      (this.ListTeacher = requestTwo), console.log(requestTwo);
    });
  }
  loadDataEx1() {
    this.students
      .getStudents()
      .pipe(map((data) => data.filter((i) => i.gender === 'Nam')))
      .subscribe((data) => console.log(data));
  }
  filter() {
    this.filterStudent = [
      ...this.ListStudents.filter((value) => value.gender == 'Nam'),
    ];
  }
}
