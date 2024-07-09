import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchRecipesComponent } from './search-recipes.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';


describe('SearchRecipesComponent', () => {
  let component: SearchRecipesComponent;
  let fixture: ComponentFixture<SearchRecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRecipesComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers:[HttpClient,HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
