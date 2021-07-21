import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';

import { ButtonModule } from 'primeng/button';
import { AddComponent } from './add/add.component';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [StudentsListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    ConfirmDialogModule,
  ],

})
export class StudentsModule {}
