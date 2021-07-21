import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../auth/models/user.model';
import { AuthPayloadRes } from '../auth/models/auth-payload-res.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<AuthPayloadRes>;
  public currentUser: Observable<AuthPayloadRes>;

  isLoginError : boolean = false;
  constructor(private userAuth: AuthService,private router: Router,) { 
    this.currentUserSubject = new BehaviorSubject<AuthPayloadRes>(JSON.parse(localStorage.getItem('auth') as string));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {

  }
  public get currentUserValue():AuthPayloadRes {
    return this.currentUserSubject.value;
}
  OnSubmit(user: string,password:string){
    this.userAuth.login(user,password).subscribe(
    (data)=>{
      console.log(data);
      localStorage.setItem('auth',JSON.stringify(data));
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse)=>{
      console.log(err)
      this.isLoginError= true;
    }
    
    )
    console.log(user,password);

  }

}
