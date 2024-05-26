import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  submitted = false;
  value:any;
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  handleSubmit() {
    this.submitted = true;
    this.router.navigateByUrl('/dashboard/recruitment');
  }
}
