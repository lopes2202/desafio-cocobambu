import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteFormulario } from './componenteFormulario.component';

describe('ComponenteFormulario', () => {
  let component: ComponenteFormulario;
  let fixture: ComponentFixture<ComponenteFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
