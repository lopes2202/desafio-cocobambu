import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstcomponentComponent } from './componenteFormulario.component';

describe('FirstcomponentComponent', () => {
  let component: FirstcomponentComponent;
  let fixture: ComponentFixture<FirstcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
