import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarVendedorComponent } from './apagar-vendedor.component';

describe('ApagarVendedorComponent', () => {
  let component: ApagarVendedorComponent;
  let fixture: ComponentFixture<ApagarVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApagarVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
