import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreLoginService } from '../pre-login.service';
import {
  FormControl,
  FormGroup,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public errorMessage: any;
  loginForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private route: Router, private loginService: PreLoginService) {}

  ngOnInit(): void {}
  onSubmit() {
    const payload = {
      name: this.loginForm.value.Username,
      password: this.loginForm.value.password,
    };
    return this.loginService.authoriseLogin(payload).subscribe(
      (data) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.route.navigate(['/dashboard']);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
