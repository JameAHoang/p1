import { AdminComponent } from './admin/admin.component';
import { SGuard } from './auth/s.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then((m) => m.AdminModule),
  //   canActivate:[AuthGuard]
  // },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'',
    component: AdminComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'home',
        component:HomeComponent,
        
      },
      {
          path: 'students',
          loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path:'teacher',
        loadChildren:()=> import('./teacher/teacher.module').then(m=>m.TeacherModule)
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[SGuard]
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
