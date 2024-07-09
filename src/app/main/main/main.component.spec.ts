import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let userService: UserService;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' })
    },
    paramMap: of(convertToParamMap({ id: '1' }))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        UserService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); 

    fixture.detectChanges();
  }));

  it('should create MainComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUserData on ngOnInit', () => {
    spyOn(component, 'loadUserData'); 

    component.ngOnInit();

    expect(component.loadUserData).toHaveBeenCalled();
  });

  it('should load user data correctly', () => {
    const mockUser = { user: 'testUser', image: 'testImage.jpg' }; 
    spyOn(userService, 'getUser').and.returnValue(mockUser);

    component.loadUserData();

    expect(component.user).toEqual('testUser');

  });
});
