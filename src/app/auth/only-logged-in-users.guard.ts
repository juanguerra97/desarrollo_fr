import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuard implements CanActivate, CanActivateChild {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    return this.authService.isLoggedIn();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    return this.authService.isLoggedIn();
  }

}
