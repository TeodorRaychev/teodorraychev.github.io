import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductResolver } from './resolvers/product.resolver';


const routes: Routes = [
  {
    path: 'products-list',
    component: ProductsListComponent,
    data: {
      title: 'Products',
      loginRequired: false,
    },
  },
  {
    path: 'detail/:id',
    resolve: {
      product: ProductResolver
    },
    component: ProductDetailsComponent,
    data: {
      title: 'Details',
      loginRequired: false,
    },
  },
];

export const ProductsRoutingModule = RouterModule.forChild(routes);
