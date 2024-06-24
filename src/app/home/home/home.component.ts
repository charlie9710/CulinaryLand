import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular'; 
import { UserService } from 'src/app/services/user.service';
import { UsersdbService } from 'src/app/services/usersdb.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  usuario: string = '';
  password : string = '';
  alertButtons = [
    {
      text: 'OK',
      handler: () => {
      }
    }
  ];
  constructor(private router: Router,private UserService: UserService,private alertController: AlertController,private userService: UsersdbService, private authService: AuthGuardService) { }

  goToRegister(){
    this.router.navigate(['/register']);
  }
  async onSubmit() {
    if (this.isValid()) {
      this.goToMain();
    } else {
      this.showAlert();
    }
  }

  async goToMain() {
    try {
      const response: any[] = await this.userService.getUser(this.usuario); 
      console.log('Respuesta de getUser:', response);
  
      if (response && response.length > 0) {
        const userRecord = response.find(record => record.user === this.usuario && record.password === this.password);
  
        if (userRecord) {
          
          this.authService.authenticated= true;
          this.UserService.setUser(this.usuario," ")
          this.router.navigate(['/main']);
        } else {
          console.error('Credenciales invalidas.');
          this.showAlert2();
        }
      } else {
        console.error('No hay resultados en la respuesta.');
        this.showAlert2();
      }
    } catch (error) {
      console.error('Error during authentication', error);
    }
  }
  ngOnInit() {
    console.log("Home")
  }
  isValid(): boolean {
    return this.usuario.length >= 3 && this.usuario.length <= 8 && this.password.length === 4;
  }

  async showAlert() {
    if (!this.isValid()) {
      const alert = await this.alertController.create({
        header: 'Validaciones incorrectas',
        message: 'Por favor ingrese una contraseña que tenga 4 dígitos y un usuario que tenga de 3 a 8 dígitos.',
        buttons: this.alertButtons
      });

      await alert.present();
    }
  }
  async showAlert2() {
    const alert = await this.alertController.create({
      header: 'Validaciones incorrectas',
      message: 'Usuario o contraseña incorrecto.',
      buttons: this.alertButtons
    });

    await alert.present();
  }

}
