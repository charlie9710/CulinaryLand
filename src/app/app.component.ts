import { Component } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { Router } from '@angular/router'; 
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthGuardService,private router: Router, private userService: UserService) {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  Logout(){
    this.userService.clearUser();
    this.auth.authenticated = false;
    this.router.navigate(['/home']); 
  }

}
