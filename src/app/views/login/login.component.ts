import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  public error:string = null;
  public procesandoLogin:boolean = false;
  public textBtnLogin:string = "Entrar";

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
    this.procesandoLogin = true;
    this.textBtnLogin = "Autenticando...";
    this.authService.logIn(this.formLogin.value.usuario,this.formLogin.value.contrasena)
        .then((user:any)=>{
          console.log("Bienvenido " + user.usuario)
          this.error = null;
          this.procesandoLogin = false;
          this.textBtnLogin = "Entrar";
        })
      .catch((error:any)=>{
        this.procesandoLogin = false;
        this.textBtnLogin = "Entrar";
        if(error.status == 0){
          console.error(error);
        } else{
          this.error = error.error;
        }

      });
  }

  public onCloseErrorAlert(): void {
    this.error = null;
  }

}
