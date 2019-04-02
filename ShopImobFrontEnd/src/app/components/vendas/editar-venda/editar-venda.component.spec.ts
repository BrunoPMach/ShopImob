import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVendaComponent } from './editar-venda.component';

describe('EditarVendaComponent', () => {
  let component: EditarVendaComponent;
  let fixture: ComponentFixture<EditarVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
