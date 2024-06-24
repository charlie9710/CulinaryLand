import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/services/user.service';
import { UsersdbService } from 'src/app/services/usersdb.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent  implements OnInit {

  constructor(private router: Router,private UserService: UserService, private userService: UsersdbService) { }

  user: string = '';
  userId: number | null = null;
  favoritos: any[] = [];

  ngOnInit() {
    this.loadUserData();
    this.searchID();
  }
  loadUserData() {
    this.user = this.UserService.getUser()?.user ?? '';
  }
  async loadFavoritos() {
    if (this.userId !== null) {
      try {
        this.favoritos = await this.userService.getFavoritosByUser(this.userId.toString());
      } catch (error) {
        console.error('Error al obtener los favoritos:', error);
      }
    } else {
      console.error('El usuario es nulo, no se pueden cargar los favoritos.');
    }
  }
  async searchID() {
    try {
      const response: any[] = await this.userService.getUser(this.user); 
      if (response && response.length > 0) {
        this.userId = response[0].id;
        this.loadFavoritos();
      }
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
    }
  }
  ionViewWillEnter() {
    this.searchID(); 
  }
  eliminarFavorito(favoritoId: number) {
    this.userService.deleteFavorito(favoritoId).subscribe(
      () => {
        console.log('Favorito eliminado correctamente');
        this.router.navigate(['/main']); 
      },
      error => {
        console.error('Error al eliminar favorito', error);
      }
    );
  }

}
