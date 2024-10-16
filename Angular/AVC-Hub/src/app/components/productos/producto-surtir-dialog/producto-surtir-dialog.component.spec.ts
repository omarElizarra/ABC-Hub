import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSurtirDialogComponent } from './producto-surtir-dialog.component';

describe('ProductoSurtirDialogComponent', () => {
  let component: ProductoSurtirDialogComponent;
  let fixture: ComponentFixture<ProductoSurtirDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoSurtirDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoSurtirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
