import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = environment.apiURL;
  private urlComponente =  `${this.urlApi}login`;

  private loggedUser = null;
  private loggedIn : boolean = false;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  public isLoggedIn():boolean {

    if(!this.loggedUser){
      if(localStorage.getItem('loggedUser')){
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedIn = true;
      }
    }

    if(this.loggedUser){
      this.loggedIn = !this.jwtHelper.isTokenExpired(this.loggedUser.token);
    }
    return this.loggedIn;
  }

  public getUser() {
    return this.loggedUser;
  }

  public getToken():string{
    let token = '';
    if(this.isLoggedIn()){
      token = this.loggedUser.token;
    }

    return token;
  }

  public logIn(username:string, password:string):void{
    if(!this.isLoggedIn()){
      this.http.post(this.urlComponente,{usuario:username,contrasena:password})
        .subscribe((res:any)=>{
          if(res.status == 200){
            this.loggedUser = res.data;
            localStorage.setItem('loggedUser',JSON.stringify(this.loggedUser));
            this.router.navigateByUrl('/');
          }else{
            console.log(res);
          }
        });
    }
    // this.loggedUser={username,password};
    // this.loggedIn = true;
  }

  public logOut(){
    localStorage.removeItem('loggedUser');
    this.loggedUser = null;
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
