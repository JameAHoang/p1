import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userAuth: AuthService,private router: Router) { }

  ngOnInit(): void {
        this.userAuth.login('test@gmail.com', '123456').subscribe(
      (res) => localStorage.setItem('auth', JSON.stringify(res))
    );
  }

}
