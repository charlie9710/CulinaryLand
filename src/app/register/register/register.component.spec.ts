import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterComponent } from './register.component';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [IonicModule.forRoot()],
      providers: [DatePipe,HttpClient,HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate user input correctly', () => {

    component.newUser = {
      user: 'testuser',
      password: '1234',
      name: 'John',
      last_name: 'Doe',
      education_level: 'Bachelor',
      birthdate: '1990-01-01'
    };
  
    const isValid = component.isValid();
  
    expect(isValid).toBeTruthy();
  });
});
