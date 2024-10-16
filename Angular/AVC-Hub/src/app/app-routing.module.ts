import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AppRouterComponent } from './shared/layout/app-router/app-router.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { PedidoComponent } from './components/pedidos/pedido/pedido.component';
import { PedidoListaComponent } from './components/pedidos/pedido-lista/pedido-lista.component';
import { PedidoSurtirComponent } from './components/pedidos/pedido-surtir/pedido-surtir.component';
import { VentGuard } from '../core/guards/vent.guard';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { ProductoReporteComponent } from './components/productos/producto-reporte/producto-reporte.component';
import { ProductoAlmacenComponent } from './components/productos/producto-almacen/producto-almacen.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppRouterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'productos',
    component: AppRouterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'lista',
        component: ProductoReporteComponent,
      },
      {
        path: 'almacen',
        component: ProductoAlmacenComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'generar',
        component:ProductoComponent,
        canActivate: [AdminGuard]
      },
    ]
  },
  {
    path: 'pedidos',
    component: AppRouterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'generar',
        component: PedidoComponent,
        canActivate: [VentGuard]
      },
      {
        path: 'lista',
        component: PedidoListaComponent,
      },
      {
        path: 'surtir',
        component: PedidoSurtirComponent,
        canActivate: [AdminGuard]
      }
    ]
  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
