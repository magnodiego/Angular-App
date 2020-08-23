import { LoginService } from './../services/login.service';
import { ProfileService } from './../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../model/user';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input()user: User;

  profileForm: FormGroup;
  mensaje = '';
  error = '';
  statusMsj = false;
  statusError = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private loginService: LoginService
    ) {
      this.createForm();
    }

    ngOnInit(): void {
      this.profileForm.setValue({
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
      });
    }

    createForm(): void{
      this.profileForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      });
    }

    onSubmit(){
      this.statusMsj = false;
      this.statusError = false;
      this.error = '';
      this.mensaje = '';

      const user: User = {
        name: this.profileForm.get('name').value,
        surname: this.profileForm.get('surname').value,
        username: this.profileForm.get('username').value
      };

      const actualUserName = JSON.parse(localStorage.getItem('currentUser')).name;
      const actualUserSurname = JSON.parse(localStorage.getItem('currentUser')).surname;
      const actualUserUsername = JSON.parse(localStorage.getItem('currentUser')).username;

      const actualUser = {name: actualUserName, surname: actualUserSurname, username: actualUserUsername};

      if (JSON.stringify(actualUser) !== JSON.stringify(user)){
        this.profileService.update(user).subscribe(
          data => {
            console.log(data);
            this.statusMsj = true;
            this.mensaje = 'Los datos se han actualizado';
          }
        );
      }else{
        this.statusError = true;
        this.error = 'No hubo modificaciones en los datos ingresados';
      }
    }
}
