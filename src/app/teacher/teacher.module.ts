import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TeacherAddComponent } from './teacher-add/teacher-add.component';

@NgModule({
  declarations: [TeacherAddComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    ConfirmDialogModule,
  ],
})
export class TeacherModule {}
