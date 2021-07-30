import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastServerity } from 'src/app/enums/toast.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  AddForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private students: StudentsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.AddForm = this.fb.group({
      idName: ['', [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    if (this.AddForm.controls['name'].value != '') {
      console.log('a');
    } else {
      console.log('b');
    }
  }
  onSubmit() {
    console.log('onSubmit');
    const newStudent: any = {};
    for (const controlName in this.AddForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.AddForm.controls[controlName].value;
      }
    }
    console.log(newStudent);
    this.students.addStudent(newStudent).subscribe((res) => {
      console.log(res);
      this.messageService.add({
        severity: ToastServerity.SUCCESS,
        summary: 'Thêm thành công',
        detail: newStudent.name,
      });
      this.router.navigate(['students']);
    });
  }
  get getIdName() {
    return this.AddForm.get('idName');
  }
  get getName() {
    return this.AddForm.get('name');
  }
  get getGender() {
    return this.AddForm.get('gender');
  }
  get getEmail() {
    return this.AddForm.get('email');
  }
  get getPhone() {
    return this.AddForm.get('phone');
  }
}
