import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFavoritarComponent } from './componente-favoritar.component';

describe('ComponenteFavoritarComponent', () => {
  let component: ComponenteFavoritarComponent;
  let fixture: ComponentFixture<ComponenteFavoritarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteFavoritarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteFavoritarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
