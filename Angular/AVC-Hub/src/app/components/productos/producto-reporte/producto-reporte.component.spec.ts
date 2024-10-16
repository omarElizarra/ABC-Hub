import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoReporteComponent } from './producto-reporte.component';

describe('ProductoReporteComponent', () => {
  let component: ProductoReporteComponent;
  let fixture: ComponentFixture<ProductoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
