import { Component, OnInit } from '@angular/core';
import { UsersdbService,User } from 'src/app/services/usersdb.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router desde '@angular/router'
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  newUser: User = {
    user: '',
    password: '',
    name: '',
    last_name: '',
    education_level: '',
    birthdate: ''
  };
  alertButtons = [
    {
      text: 'OK',
      handler: () => {}
    }
  ];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private usersdbService: UsersdbService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log("Registro");
  }

  goToMain() {
    this.router.navigate(['/']);
  }

  onFechaNacimientoChange(event: any) {
    const fecha = new Date(event);
    this.newUser.birthdate = this.datePipe.transform(fecha, 'yyyy-MM-dd')!;
  }

  async CreateUser() {
    const response: any[] = await this.usersdbService.getUser(this.newUser.user); 
    console.log('Response from getUser:', response);
    if (response && response.length > 0) {
      this.showAlert('Nombre de usuario ocupado, por favor elige otro');
    } else {
      if (this.isValid()) {
        try {
          const user = await this.usersdbService.createUser(this.newUser);
          console.log('User created:', user);
          this.showAlert('Usuario creado con éxito');
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      } else {
        this.showAlert('Hay campos que no están ocupados, el usuario no tiene de 3 a 8 dígitos o la contraseña no tiene 4 dígitos.');
      }
    }
  }

  isValid(): boolean {
    return this.newUser.user.length >= 3 && this.newUser.user.length <= 8 &&
           this.newUser.password.length === 4 &&
           this.newUser.name.trim() !== '' &&
           this.newUser.last_name.trim() !== '' &&
           this.newUser.education_level.trim() !== '' &&
           this.newUser.birthdate.trim() !== '';
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message: message,
      buttons: this.alertButtons
    });

    await alert.present();
  }

}
