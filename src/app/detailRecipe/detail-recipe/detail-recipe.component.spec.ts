import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DetailRecipeComponent } from './detail-recipe.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailRecipeComponent', () => {
  let component: DetailRecipeComponent;
  let fixture: ComponentFixture<DetailRecipeComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' })
    },
    paramMap: of(convertToParamMap({ id: '1' }))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRecipeComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule 
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
  it('should initialize with default values', () => {
    expect(component.user).toEqual('');
    expect(component.recipeId).toEqual(918033); 
    expect(component.searchQuery).toEqual('');
    expect(component.searchImage).toEqual('');
    expect(component.searchTitle).toEqual('');
    expect(component.ingredientes.length).toEqual(0);
    expect(component.recipes.length).toEqual(0);
    expect(component.instructions).toEqual('');
    expect(component.image).toEqual('');
    expect(component.title).toEqual('');
    expect(component.ingredients.length).toEqual(0);
    expect(component.online).toEqual(true);
  });
  
});