import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { AppRouterComponent } from './shared/layout/app-router/app-router.component';
import { MenuItemComponent } from './shared/layout/header/menu-item/menu-item.component';
import { PageHeaderComponent } from './shared/layout/header/page-header.component';
import { PedidoSurtirComponent } from './components/pedidos/pedido-surtir/pedido-surtir.component';
import { PedidoListaComponent } from './components/pedidos/pedido-lista/pedido-lista.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { ProductoReporteComponent } from './components/productos/producto-reporte/producto-reporte.component';
import { ProductoAlmacenComponent } from './components/productos/producto-almacen/producto-almacen.component';
import { PedidoComponent } from './components/pedidos/pedido/pedido.component';
import { ProductoSurtirDialogComponent } from './components/productos/producto-surtir-dialog/producto-surtir-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuItemComponent,
    UsuarioComponent,
    HeaderComponent,
    PageHeaderComponent,
    AppRouterComponent,
    PedidoComponent,
    PedidoListaComponent,
    PedidoSurtirComponent,
    ProductoComponent,
    ProductoReporteComponent,
    ProductoAlmacenComponent,
    ProductoSurtirDialogComponent,
    //CommonModule,
    //HomeComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpClientModule // Asegúrate de importar HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync() // Registra el interceptor
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
