import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastServerity } from 'src/app/enums/toast.enum';
import { Student } from '../students.model';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  AddForm: FormGroup;
  id: string | null ='';
  constructor( private router: Router,
    private fb: FormBuilder,
    private students: StudentsService,
    private messageService: MessageService,
    private _activatedroute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this._activatedroute.snapshot.paramMap.get('id');
    this.loadData(this.id);
    this.formGroup();
  }
  loadData(id: any){
    this.students.GetStudentById(id).subscribe((data)=>{
      console.log('student',data);
      for (const controlName in this.AddForm.controls) {
        if (controlName) {
          this.AddForm.controls[controlName].setValue(data[controlName]);
        }
      }
    })
    console.log(id)
  }
  formGroup(){
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
  }
  createNewData() {
    const newStudent = {};
    for (const controlName in this.AddForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.AddForm.controls[controlName].value;
      }
    }
    return newStudent as Student
  }
  onSubmit() {
    this.students.editStudent(this.id as string,this.createNewData()).subscribe((data)=>{
      this.messageService.add({
        severity: ToastServerity.SUCCESS,
        summary: 'Thêm thành công',
        detail: data.name,
      });
      this.router.navigate(['students']);
    })
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
