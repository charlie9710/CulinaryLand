import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {

  user: string = '';


  constructor(private route: ActivatedRoute, private router: Router,private UserService: UserService) {
    
   }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.UserService.getUser()?.user ?? '';
  }

}
