import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoSurtirComponent } from './pedido-surtir.component';

describe('PedidoSurtirComponent', () => {
  let component: PedidoSurtirComponent;
  let fixture: ComponentFixture<PedidoSurtirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoSurtirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoSurtirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
