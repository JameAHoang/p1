import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  providers: [ConfirmationService],
})
export class TeacherListComponent implements OnInit {
  ListTeacher: Teacher[] = [];
  constructor(private router: Router, private Teacher: TeacherService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.Teacher.getTeacher().subscribe({
      next: (res) => {
        this.ListTeacher = res;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('LoadData');
      },
    });
  }
  addTeacher() {
    this.router.navigate(['teacher/add']);
  }
}
