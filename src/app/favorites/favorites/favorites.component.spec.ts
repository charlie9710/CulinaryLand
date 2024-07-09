import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesComponent } from './favorites.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';
import { UsersdbService } from 'src/app/services/usersdb.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let userService: UsersdbService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        UsersdbService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersdbService);
    router = TestBed.inject(Router);
    spyOn(userService, 'deleteFavorito').and.returnValue(of(undefined)); 

    fixture.detectChanges();
  }));
  it('should create FavoritesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should delete favorite and navigate to main', () => {
    const favoritoId = 1; 
    spyOn(router, 'navigate').and.callThrough(); 

    component.eliminarFavorito(favoritoId);

    expect(userService.deleteFavorito).toHaveBeenCalledWith(favoritoId);
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  });

});