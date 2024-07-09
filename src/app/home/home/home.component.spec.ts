import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [IonicModule.forRoot()],
      providers:[HttpClient,HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to main if valid credentials are provided', () => {
    spyOn(component, 'isValid').and.returnValue(true);
    spyOn(component, 'goToMain');
  
    component.onSubmit();
  
    expect(component.goToMain).toHaveBeenCalled();
  });
  
  it('should show alert if credentials are invalid', async () => {
    spyOn(component, 'isValid').and.returnValue(false);
    spyOn(component, 'showAlert');
  
    await component.onSubmit();
  
    expect(component.showAlert).toHaveBeenCalled();
  });
  
  it('should return true when credentials are valid', () => {
    component.usuario = 'user';
    component.password = '1234';
  
    const isValid = component.isValid();
  
    expect(isValid).toBeTruthy();
  });
  
  it('should return false when credentials are invalid', () => {
    component.usuario = 'user';
    component.password = '12345'; 
  
    const isValid = component.isValid();
  
    expect(isValid).toBeFalsy();
  });
});
