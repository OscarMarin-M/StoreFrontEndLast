import { Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
export const routes: Routes = [
{

  path: 'categories',
  //cargar con Lazyload el componente, ojo que el componente debe importarse por ""
  loadComponent: ()=> import ('./contact-list/contact-list.component')

},
{
  path: 'categories/new',
  loadComponent: ()=> import ('./category-form/category-form.component')
},

{
  path: 'categories/:id/edit',
  loadComponent: ()=> import ('./category-form/category-form.component')
},

//STORES

{

  path: 'stores',
  //cargar con Lazyload el componente, ojo que el componente debe importarse por ""
  loadComponent: ()=> import ('./store/store.component')

},
{
  path: 'stores/new',
  loadComponent: ()=> import ('./store-form/store-form.component')
},

{
  path: 'stores/:id/edit',
  loadComponent: ()=> import ('./store-form/store-form.component')
},

//PRODUCTS

{

  path: 'products',
  //cargar con Lazyload el componente, ojo que el componente debe importarse por ""
  loadComponent: ()=> import ('./product/product.component')

},
{
  path: 'products/new',
  loadComponent: ()=> import ('./product-form/product-form.component')
},

{
  path: 'products/:id/edit',
  loadComponent: ()=> import ('./product-form/product-form.component')
},


//ORDERS

{

  path: 'order',
  //cargar con Lazyload el componente, ojo que el componente debe importarse por ""
  loadComponent: ()=> import ('./order/order.component')

},
{
  path: 'order/new',
  loadComponent: ()=> import ('./order-form/order-form.component')
},

{
  path: 'order/:id/edit',
  loadComponent: ()=> import ('./order-form/order-form.component')
},


//COMPRAS

{

  path: 'compras',
  //cargar con Lazyload el componente, ojo que el componente debe importarse por ""
  loadComponent: ()=> import ('./comprar/comprar.component')

},
{
  path: 'compras/new',
  loadComponent: ()=> import ('./comprar-form/comprar-form.component')
},

{
  path: 'compras/:id/edit',
  loadComponent: ()=> import ('./comprar-form/comprar-form.component')
},

//compras



];
