import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MessageService} from "primeng/api";
import {ErrorResponse} from "../../shared/model/api.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    submitted = false;
    value: any;

    constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
    }

    handleSubmit() {
        if (this.loginForm.valid) {
            // @ts-ignore
            this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Login Success',
                        life: 1000
                    });
                    this.router.navigateByUrl('/dashboard');
                },
                error: err => {
                  let errorResponse: ErrorResponse = err?.error;

                    this.messageService.add({
                        severity: 'error',
                        detail: errorResponse.error_message,
                        summary: "Đăng nhập thất bại",
                        life: 1000
                    })
                }
            });
        }
    }
}
