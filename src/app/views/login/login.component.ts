import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ){}

  public formLogin = new FormGroup({
    usuario: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    contrasena: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ])
  });


  public onSubmit(){
    this.authService.logIn(this.formLogin.value.usuario,this.formLogin.value.contrasena);
  }

}
