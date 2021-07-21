import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userAuth: AuthService,private router: Router) { 
  }

  ngOnInit(): void {

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
