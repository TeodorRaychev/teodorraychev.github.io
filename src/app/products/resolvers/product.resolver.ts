import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { from, Observable, take } from 'rxjs';
import { IProduct } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<IProduct | null> {
  res: IProduct | null  = null;
  constructor(private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProduct | null | Observable<IProduct> | Promise<IProduct> {
    const productId = route.params['id'];
    if (!productId) {
      this.router.navigate(['products/products-list']);
      return null;
    }
    return Backendless.Data.of('products').findById<IProduct>({objectId: productId});
  }
}
