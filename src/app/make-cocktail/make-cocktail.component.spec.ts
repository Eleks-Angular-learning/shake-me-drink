import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCocktailComponent } from './make-cocktail.component';

describe('MakeCocktailComponent', () => {
  let component: MakeCocktailComponent;
  let fixture: ComponentFixture<MakeCocktailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCocktailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
