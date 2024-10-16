import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAlmacenComponent } from './producto-almacen.component';

describe('ProductoAlmacenComponent', () => {
  let component: ProductoAlmacenComponent;
  let fixture: ComponentFixture<ProductoAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoAlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
