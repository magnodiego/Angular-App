import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) {
    this.createForm();
  }

  createForm(): FormGroup {
    return this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.loginForm.valid) {
      return;
    }

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    console.log(username, password);

    this.loading = true;

    this.loginService.login(username, password).subscribe(
      data => {
        if (data != null){
          this.router.navigate(['/profile']);
        }else {
          this.loading = false;
          this.error = 'Error en la conexion, revise sus datos';
        }
      }
    );
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
