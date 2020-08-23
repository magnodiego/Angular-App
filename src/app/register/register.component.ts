import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private loginService: LoginService
    ) {
    this.createForm();
  }

  createForm(): FormGroup {
    return this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      passwordRepeat: ['', [Validators.required]]
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup): any {
    const pass: string = group.controls.password.value;
    const confirmPass: string = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (!this.registerForm.valid){
      return;
    }

    const formValues = this.registerForm.value;
    console.log(formValues);

    this.loading = true;

    this.registerService.register(formValues).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.success = 'Usuario registrado, redireccionando al profile';
        this.loginService.updateUser(data)
        this.router.navigate(['/profile']);
      }, error => {
        console.log(error);
        this.loading = false;
        this.error = 'El usuario ya se encuentra registrado en la base de datos';
      }
    );
  }

  get name() { return this.registerForm.get('name'); }
  get surname() { return this.registerForm.get('surname'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get passwordRepeat() { return this.registerForm.get('passwordRepeat'); }

}
