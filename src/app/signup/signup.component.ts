import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { PreLoginService } from '../pre-login.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public errorMessage: any;

  signForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
  });

  constructor(private route: Router, private loginService: PreLoginService) {}

  ngOnInit(): void {}

  onSubmit() {
    const payload = {
      name: this.signForm.value.name,
      mobile: this.signForm.value.mobile,
      password: this.signForm.value.password,
      role: this.signForm.value.role,
    };
    return this.loginService.registerUser(payload).subscribe(
      (data) => {
        this.errorMessage = data;
        this.signForm.reset();
        console.log(data);
        this.route.navigate(['']);
      },

      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
