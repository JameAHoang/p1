import { data } from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TeacherService } from './../teacher.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastServerity } from 'src/app/enums/toast.enum';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css'],
})
export class TeacherAddComponent implements OnInit {
  constructor(
    private router: Router,
    private teacher: TeacherService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  addForm: FormGroup;
  ngOnInit(): void {
    this.addForm = this.fb.group({
      idName: [''],
      name: [''],
      salary: [''],
      birthday: [''],
      email: [''],
      address: [''],
      phone: [''],
      gender: [''],
    });
  }
  onSubmit() {
    console.log('aaaa');
    const newTeacher: any = {};
    for (const controlName in this.addForm.controls) {
      if (controlName) {
        newTeacher[controlName] = this.addForm.controls[controlName].value;
      }
    }
    console.log(newTeacher);
    this.teacher.addTeacher(newTeacher).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.messageService.add({
          severity: ToastServerity.SUCCESS,
          summary: 'Thêm thành công',
          detail: newTeacher.name,
        });
        this.router.navigate(['teacher']);
      },
    });
  }
}
