import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { IMenu } from '../../../../core/interfaces/menu.interface';
import { Router } from '@angular/router';
import { AuthServices } from '../../../../auth/auth.service';
import { IResUsuario } from '../../../../core/interfaces/usuarios.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    opened = false;
    user!: IResUsuario; 

    constructor( private router: Router, private authServices: AuthServices, ){}

  toggle(): void {
    this.opened = !this.opened;
  }
  menuItems: IMenu = [
        {
          title: 'Home',
          icon: 'home',
          link: '/home',
        },
        {
          title: 'Productos',
          icon: 'archive',
          subMenu: [
            {
              title: 'Consultar existencias',
              icon: 'production_quantity_limits',
              link: '/productos/lista',
            },
            // {
            //   title: 'Almacen',
            //   icon: 'inventory_2',
            //   link: '/productos/almacen',
            // },
            {
              title: 'Registrar producto',
              icon: 'category',
              link: '/productos/generar',
            },
          ],
        },
        {
          title: 'Pedidos',
          icon: 'shopping_cart',
          subMenu: [
            {
              title: 'Surtir pedido',
              icon: 'shopping_cart_checkout',
              link: '/pedidos/surtir',
            },
            {
              title: 'Consultar pedido',
              icon: 'manage_search',
              link: '/pedidos/lista',
            },
            {
              title: 'Crear pedido',
              icon: 'add_shopping_cart',
              link: '/pedidos/generar',
            },
          ],
        },
        
      ];

    ngOnInit(): void {
        this.user = this.authServices.getUser()
        console.info('Init header', this.user)

     }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      }

      goTo(menu: any){
        console.log(menu)
      }

}
