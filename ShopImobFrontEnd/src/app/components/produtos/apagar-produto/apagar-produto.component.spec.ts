import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarProdutoComponent } from './apagar-produto.component';

describe('ApagarProdutoComponent', () => {
  let component: ApagarProdutoComponent;
  let fixture: ComponentFixture<ApagarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApagarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
