import { LoginComponent } from './../login/login.component';
import { Router } from '@angular/router';
// Angular
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

// Rxjs
import {Observable} from "rxjs";
import {exhaustMap, take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})


export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private a: LoginComponent) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let currentUser = this.a.currentUserValue;
    // if(currentUser&& currentUser.idToken){
      if(localStorage.getItem('auth') != null){
        var authString = localStorage.getItem('auth') as string;
        var auth = JSON.parse(authString);
        var auth = JSON.parse(authString);
        console.log(auth);
               req = req.clone({
    // setHeaders: { Authorization: `Bearer ${auth.idToken}` }

    params: req.params.append('auth', auth.idToken),
  });}
    // var authString = localStorage.getItem('auth') as string;
    // var auth = JSON.parse(authString);
    // console.log(auth);
    // req = req.clone({
    //   // setHeaders: { Authorization: `Bearer ${auth.idToken}` }

    //   params: req.params.append('auth', auth.idToken),
    // });
    // }
    // return next.handle(req); var authString = localStorage.getItem('auth') as string;
    
  return next.handle(req);
  }
 
  

}