import { Component, OnInit,AfterViewInit,ElementRef, ViewChild  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Animation, AnimationController,IonInput, IonSelect } from '@ionic/angular';
import { UsersdbService } from 'src/app/services/usersdb.service';

import { Camera,CameraResultType, CameraSource  } from '@capacitor/camera';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {

  public photo: SafeResourceUrl | undefined;


 
  @ViewChild('nombreField', { read: ElementRef }) nombreField!: ElementRef;
  @ViewChild('apellidoField', { read: ElementRef }) apellidoField!: ElementRef;
  nivelEducacionField: string = ''; 
  fechaNacimientoField: Date | undefined;


  user: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion!: string;
  fechaNacimiento!: Date;


  private nameAnimation!: Animation;
  private lastNameAnimation!: Animation;

  alertButtons = [
    {
      text: 'OK',
      handler: () => { }
    }
  ];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private animationCtrl: AnimationController,
    private UserService: UserService, 
    private userService: UsersdbService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.updateUser(this.user);
  }

  loadUserData() {
    this.user = this.UserService.getUser()?.user ?? '';
    const userData = this.UserService.getUser();
    if (userData && userData.image) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(userData.image);
    }
  }
  async takePicture() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      // Use webPath to display the new image instead of base64 since it's already loaded into memory
      //  this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);
      // Si deseas mostrar la imagen inmediatamente, puedes establecerla en el template
      // <img [src]="image" *ngIf="image">

      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto.webPath!);
      this.UserService.setUser(this.user, this.photo ? this.photo.toString() : '');

    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  updateUser(query: string): void {
    this.userService.getUser(query).then((users) => {
      if (users.length > 0) {
        const user = users[0];
        this.user = user.user;
        this.nombre = user.name;
        this.apellido = user.last_name;
        this.nivelEducacion = user.education_level;
        this.fechaNacimiento = new Date(user.birthdate);
      }
    }).catch((error) => {
      console.error('Error fetching user data', error);
    });
  }

  updateProfile() {
    if (this.nombreField && this.apellidoField && this.nivelEducacionField && this.fechaNacimientoField) {
      const fechaNacimientoFormatted = this.formatDate(this.fechaNacimientoField);
      const updatedData = {
        name: this.nombreField.nativeElement.value,
        last_name: this.apellidoField.nativeElement.value,
        education_level: this.nivelEducacionField,
        birthdate: fechaNacimientoFormatted
      };

      console.log('Datos a actualizar:', updatedData);

      this.userService.updateUser(this.user, updatedData).subscribe(
        response => {
          console.log('Usuario actualizado correctamente.', response);
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Error actualizando al usuario.', error);
        }
      );
    } else {
      console.error('Uno o más elementos no están definidos');
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Añade 1 porque getMonth() devuelve el mes base cero
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  limpiarDatos() {
    this.nombreField.nativeElement.value = '';
    this.apellidoField.nativeElement.value = '';
    this.nivelEducacionField = '';
    this.fechaNacimientoField = new Date();
  }

  ngAfterViewInit() {
    this.nameAnimation = this.createAnimation(this.nombreField.nativeElement);
    this.lastNameAnimation = this.createAnimation(this.apellidoField.nativeElement);
  }

  createAnimation(element: any): Animation {
    return this.animationCtrl
      .create()
      .addElement(element)
      .duration(1000)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }

  playAnimations() {
    if (this.nameAnimation) {
      this.nameAnimation.play();
    }
    if (this.lastNameAnimation) {
      this.lastNameAnimation.play();
    }

    setTimeout(() => {
      if (this.nameAnimation) {
        this.nameAnimation.stop();
      }
      if (this.lastNameAnimation) {
        this.lastNameAnimation.stop();
      }
    }, 1000);
  }
}