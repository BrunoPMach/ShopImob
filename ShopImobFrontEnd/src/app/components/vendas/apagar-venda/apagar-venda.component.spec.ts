import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarVendaComponent } from './apagar-venda.component';

describe('ApagarVendaComponent', () => {
  let component: ApagarVendaComponent;
  let fixture: ComponentFixture<ApagarVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApagarVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
