import { response } from './../students.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../students.model';
import { StudentsService } from '../students.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Message } from 'primeng/api';
import { ToastServerity } from 'src/app/enums/toast.enum';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  providers: [ConfirmationService],
})
export class StudentsListComponent implements OnInit {
  constructor(
    private router: Router,
    private Student: StudentsService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}
  ListStudents: Student[] = [];
  msgs: Message[] = [];
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loadData();
  }
  loadData() {
    this.Student.getStudents().subscribe(
      (response) => {
        this.ListStudents = response;
        console.log(response);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('Thanh cong');
      }
    );
  }
  addStudent() {
    this.router.navigate(['students/add']);
  }
  confirm2(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Bạn có chắc chắn muốn xoá ${name} không?`,
      header: `Xóa ${name}`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [
          { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' },
        ];
        this.Student.deleteStudent(id).subscribe((res) => {
          console.log('delete', res);
          this.loadData();
          this.messageService.add({
            severity: ToastServerity.SUCCESS,
            summary: 'Xóa thành công',
            detail: `${name}`,
          });
        });
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
  }
  deleteStudent(id: string) {
    this.Student.deleteStudent(id).subscribe((res) => {
      console.log('delete', res);
      this.loadData();
    });
  }
  editStudent(studentId: string) {
    this.router.navigate(['students','edit', studentId]);
  }
}
