import { Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  public authenticated = false;
  constructor(private router: Router,private userService: UserService) { }

  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
