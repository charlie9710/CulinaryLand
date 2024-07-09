import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsComponent } from './settings.component';
import { ActivatedRoute,convertToParamMap } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { of } from 'rxjs';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' }) // ajusta según tus necesidades
    },
    paramMap: of(convertToParamMap({ id: '1' }))
  };


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule 
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        HttpClient 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
